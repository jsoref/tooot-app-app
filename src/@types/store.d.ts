declare namespace store {
  type InstanceInfoState = {
    local: string
    localToken: string
    remote: string
  }

  type Pages =
    | 'Following'
    | 'Local'
    | 'LocalPublic'
    | 'RemotePublic'
    | 'Notifications'
    | 'Hashtag'
    | 'List'
    | 'Toot'
    | 'Account_Default'
    | 'Account_All'
    | 'Account_Media'

  type QueryKey = [
    Pages,
    {
      page: Pages
      hashtag?: string
      list?: string
      toot?: string
      account?: string
    }
  ]
}