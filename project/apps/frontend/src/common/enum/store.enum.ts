enum AppRoute {
  Main = '/',
  Register = '/register',
  Login = '/login',
  Product = '/product',
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
  Product = 'PRODUCT',
  Products = 'PRODUCTS',
}

enum APIRoute {
  Products = '/products',
  Product = '/products/{offerId}',
  Login = '/login',
  Logout = '/logout',
  Register = '/register',
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
