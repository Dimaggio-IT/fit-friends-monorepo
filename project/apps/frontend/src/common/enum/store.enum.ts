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
  Purchases = '/purchases',
  NotFound = '*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum NameSpace {
  App = 'APP',
  User = 'USER',
  Users = 'USERS',
  Comment = 'COMMENT',
  Comments = 'COMMENTS',
  Notification = 'NOTIFICATION',
  Notifications = 'NOTIFICATIONS',
  Product = 'PRODUCT',
  Products = 'PRODUCTS',
}

enum APIRoute {
  Products = '/products',
  Product = '/products/{offerId}',
  Login = '/auth/login',
  Register = '/auth/register',
  Users = '/users',
  User = '/users/{userId}',
  Notifications = '/users/notifications',
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
