param serverName string
@secure()
param serverAdminLogin string
@secure()
param serverAdminPassword string

resource symbolicname 'Microsoft.DBforPostgreSQL/servers@2017-12-01' = {
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
