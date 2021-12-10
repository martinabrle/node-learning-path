param serverName string
@secure()
param serverAdminLogin string
@secure()
param serverAdminPassword string

param appServicePlanName string
param appServiceName string

resource postgreSQLServer 'Microsoft.DBforPostgreSQL/servers@2017-12-01' = {
  name: serverName
  location: resourceGroup().location
  tags: {
    workload: 'test'
    costCentre: 'development'
  }
  sku: {
    capacity: 1
    family: 'Gen5'
    name: 'B_Gen5_1'
    size: 'string'
    tier: 'Basic'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    infrastructureEncryption: 'Disabled'
    minimalTlsVersion: 'TLSEnforcementDisabled'
    publicNetworkAccess: 'Enabled'
    sslEnforcement: 'Enabled'
    storageProfile: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
      storageAutogrow: 'Disabled'
      storageMB: 5120
    }
    version: '11'
    createMode: 'Default' //PointInTimeRestore, Replica, GeoRestore
    administratorLogin: serverAdminLogin
    administratorLoginPassword: serverAdminPassword
  }
}

resource postgreSQLServer_AllowAllWindowsAzureIps 'Microsoft.DBforPostgreSQL/servers/firewallRules@2017-12-01' = {
  parent: postgreSQLServer
  name: 'AllowAllWindowsAzureIps'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

resource postgreSQLServer_ClientIPAddress 'Microsoft.DBforPostgreSQL/servers/firewallRules@2017-12-01' = {
  parent: postgreSQLServer
  name: 'CurrentClientIPAddress_CICD'
  properties: {
    startIpAddress: '2.30.99.244'
    endIpAddress: '2.30.99.244'
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: appServicePlanName
  location: resourceGroup().location
  dependsOn: [
    postgreSQLServer
  ]
  properties: {
    reserved: true
  }
  sku: {
    name: 'F1'
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2021-02-01' = {
  name: appServiceName
  dependsOn: [
    appServicePlan
  ]
  location: resourceGroup().location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'node|16-lts'
      scmType: 'None' 
    }
  }
  resource appServicePort 'config' = {
    name: 'web'
    properties: {
      appSettings: [
        {
          name: 'PORT'
          value: '80'
        }
      ]
    }
  }
}
