param serverName string
@secure()
param serverAdminLogin string
@secure()
param serverAdminPassword string

resource postgresql_server 'Microsoft.DBforPostgreSQL/servers@2017-12-01' = {
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

resource postgresql_server_AllowAllWindowsAzureIps 'Microsoft.DBforPostgreSQL/servers/firewallRules@2017-12-01' = {
  parent: postgresql_server
  name: 'AllowAllWindowsAzureIps'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

resource postgresql_server_ClientIPAddress 'Microsoft.DBforPostgreSQL/servers/firewallRules@2017-12-01' = {
  parent: postgresql_server
  name: 'CurrentClientIPAddress_CICD'
  properties: {
    startIpAddress: '2.30.99.244'
    endIpAddress: '2.30.99.244'
  }
}
