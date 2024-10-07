enum AppRoute {
  Main = '/',
  Intro = '/intro',
  Register = '/register',
  Login = '/login',
  Product = '/product',
  Catalog = '/catalog',
  Cabinet = '/cabinet',
  Friends = '/friends',
  Supporter = '/supporter',
  Balances = '/balances',
  NotFound = '*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum NameSpace {
  App = 'APP',
  Users = 'USERS',
  UserProcess = 'USER_PROCESS',
  User = 'USER',
  Products = 'PRODUCTS',
  Product = 'PRODUCT',
  Comments = 'COMMENTS',
  Notifications = 'NOTIFICATIONS',
  Friends = 'FRIENDS',
  Order = 'ORDER',
  Balances = 'BALANCES',
}

enum APIRoute {
  Register = '/auth/register',
  Login = '/auth/login',
  Refresh = '/auth/refresh',
  Product = '/products/offer',
  Products = '/products',
  Comment = '/products/comment',
  Comments = '/products/comments',
  Users = '/users',
  Notification = '/users/notification',
  Notifications = '/users/notifications',
  Friend = '/users/friend',
  Friends = '/users/friends',
  Order = '/users/order',
  Balances = '/users/balances',
}

enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

export {
  AppRoute,
  AuthorizationStatus,
  NameSpace,
  APIRoute,
  RequestStatus,
};
