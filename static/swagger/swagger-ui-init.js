
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api": {
        "get": {
          "operationId": "AppController_welcomeMessage",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Welcome API route",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Welocme to watch store application API"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Welcome"
          ]
        }
      },
      "/api/auth/signup": {
        "post": {
          "operationId": "AuthController_signup",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Sign up a new user",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User signed up correctly"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "The email user tried to create is already exist",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Email is already exists"
                  }
                }
              }
            },
            "500": {
              "description": "User not created after hitting the database with the query",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Error happen during creating the user"
                  }
                }
              }
            }
          },
          "tags": [
            "Authentication"
          ]
        }
      },
      "/api/auth/signin": {
        "post": {
          "operationId": "AuthController_signin",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SignInUserDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Sign in the user to get the credentials",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User signed in correctly",
                      "data": {
                        "token": "cuznt49481209841841stnaitnar",
                        "userData": {
                          "id": "cuzin98424n4l24k4k1l",
                          "username": "John Doe",
                          "email": "example@example.com",
                          "image": "https://image_url.com"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "User entered wrong credentials email or password",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Email or Password is not correct"
                  }
                }
              }
            },
            "401": {
              "description": "User must activate his account before try to signin",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Activate the account to login"
                  }
                }
              }
            },
            "404": {
              "description": "The email user trying to signin is not exist",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Email is not exist"
                  }
                }
              }
            },
            "500": {
              "description": "Error happen that access token for user not created",
              "content": {
                "application/json": {
                  "example": {
                    "succes": false,
                    "message": "Error happend during create user session"
                  }
                }
              }
            }
          },
          "tags": [
            "Authentication"
          ]
        }
      },
      "/api/auth/verify-email/{token}": {
        "post": {
          "operationId": "AuthController_verifyEmail",
          "parameters": [
            {
              "name": "token",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Activate the user account",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been activated successfully",
                      "data": {
                        "token": "cucze239813098nen23cc",
                        "userData": {
                          "id": "cuzin98424n4l24k4k1l",
                          "username": "John Doe",
                          "email": "example@example.com",
                          "image": "https://image_url.com"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Verifying token is not exist",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "The token is not exist"
                  }
                }
              }
            },
            "500": {
              "description": "Error happen during update the user",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Error happened during verifying the user"
                  }
                }
              }
            }
          },
          "tags": [
            "Authentication"
          ]
        }
      },
      "/api/auth/forget-password": {
        "post": {
          "operationId": "AuthController_forgetPassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForgetPasswordDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Send email to reset the user password",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Password has been reseted successfully"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "The email user trying to change the password for is not exist",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Email is not exist"
                  }
                }
              }
            },
            "500": {
              "description": "Error happend during creating the user forget password token",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Error happend during in forget password"
                  }
                }
              }
            }
          },
          "tags": [
            "Authentication"
          ]
        }
      },
      "/api/auth/reset-password/{token}": {
        "post": {
          "operationId": "AuthController_resetPassword",
          "parameters": [
            {
              "name": "token",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResetPasswordDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update the user password",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Reset mail has sent successfully"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "The user entered password different from the confirm password",
              "content": {
                "application/json": {
                  "example": {
                    "status": false,
                    "message": "Password must be the same as reset password"
                  }
                }
              }
            },
            "500": {
              "description": "The user didn't update correctly",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Error during updating the user"
                  }
                }
              }
            }
          },
          "tags": [
            "Authentication"
          ]
        }
      },
      "/api/auth/validate-reset/{token}": {
        "get": {
          "operationId": "AuthController_validateResetToken",
          "parameters": [
            {
              "name": "token",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The token is valid to be used by the user to reset the password",
              "content": {
                "application/json": {
                  "example": {
                    "success": true,
                    "message": "Token is valid to be used"
                  }
                }
              }
            },
            "400": {
              "description": "The token that user user is not exist",
              "content": {
                "application/json": {
                  "example": {
                    "status": false,
                    "message": "Token is not exist"
                  }
                }
              }
            }
          },
          "tags": [
            "Authentication"
          ]
        }
      },
      "/api/users/current": {
        "get": {
          "operationId": "UsersController_current",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Get the current user data",
              "content": {
                "application/json": {
                  "example": {
                    "success": true,
                    "message": "User has been obtained successfully",
                    "data": {
                      "userData": {
                        "id": "custan313128149nisc81",
                        "username": "John Doe",
                        "email": "example@example.com",
                        "avatar_url": "https://image_url.com"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "example": {
                    "status": false,
                    "message": "Unauthorized"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        },
        "patch": {
          "operationId": "UsersController_updateCurrent",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update the current user data",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been updated successfully",
                      "data": {
                        "userData": {
                          "id": "custan313128149nisc81",
                          "username": "New name",
                          "email": "example@example.com",
                          "avatar_url": "https://new_image_url.com"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Can't found any data to update user with it",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Must provide a data to update the user"
                  }
                }
              }
            },
            "404": {
              "description": "Can't found the user in the Database",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "User is not exist"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        },
        "delete": {
          "operationId": "UsersController_remove",
          "parameters": [],
          "responses": {
            "204": {
              "description": "Delete the user account"
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/api/users/{id}": {
        "get": {
          "operationId": "UsersController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get any user data for admin",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been obtained successfully",
                      "data": {
                        "userData": {
                          "id": "custan313128149nisc81",
                          "username": "John Doe",
                          "email": "example@example.com",
                          "avatar_url": "https://image_url.com"
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Normal user can't hit this route to get any user data",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Unauthorized"
                  }
                }
              }
            },
            "404": {
              "description": "Can't found the user in the Database",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "User is not exist"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        },
        "patch": {
          "operationId": "UsersController_updateAdmin",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update the user data for admin to update any user",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been updated successfully",
                      "data": {
                        "userData": {
                          "id": "custan313128149nisc81",
                          "username": "New name",
                          "email": "example@example.com",
                          "avatar_url": "https://new_image_url.com"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Can't found any data to update user with it",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Must provide a data to update the user"
                  }
                }
              }
            },
            "401": {
              "description": "Normal user can't hit this route to update any user",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Unauthorized"
                  }
                }
              }
            },
            "404": {
              "description": "Can't found the user in the Database",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "User is not exist"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        },
        "delete": {
          "operationId": "UsersController_removeAdmin",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Delete any user account by the admin"
            },
            "401": {
              "description": "Normal user can't hit this route to delete any user",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "Unauthorized"
                  }
                }
              }
            },
            "404": {
              "description": "Can't found the user in the Database",
              "content": {
                "application/json": {
                  "example": {
                    "success": false,
                    "message": "User is not exist"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/api/users/current/password": {
        "patch": {
          "operationId": "UsersController_updatePassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePasswordDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Users"
          ]
        }
      }
    },
    "info": {
      "title": "Watch Store APIs",
      "description": "The description of watch store APIs",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "CreateUserDTO": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "example": "Youssef"
            },
            "email": {
              "type": "string",
              "example": "example@example.com"
            },
            "password": {
              "type": "string",
              "example": "This is very secret"
            }
          },
          "required": [
            "username",
            "email",
            "password"
          ]
        },
        "SignInUserDTO": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "example@example.com"
            },
            "password": {
              "type": "string",
              "example": "This is very secret"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "ForgetPasswordDTO": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "example@example.com"
            }
          },
          "required": [
            "email"
          ]
        },
        "ResetPasswordDTO": {
          "type": "object",
          "properties": {
            "password": {
              "type": "string",
              "example": "This is very secret"
            },
            "confirmPassword": {
              "type": "string",
              "example": "This is very secret"
            }
          },
          "required": [
            "password",
            "confirmPassword"
          ]
        },
        "UserAddressDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "example": "USA"
            },
            "city": {
              "type": "string",
              "example": "New York"
            },
            "state": {
              "type": "string",
              "example": "NY"
            },
            "street": {
              "type": "string",
              "example": "123 Main St"
            },
            "zipcode": {
              "type": "string",
              "example": "10001"
            }
          },
          "required": [
            "country",
            "city",
            "state",
            "street",
            "zipcode"
          ]
        },
        "UpdateUserDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "example": "Mahmoud"
            },
            "avatar_url": {
              "type": "string",
              "example": "https://image_url.com"
            },
            "cover_url": {
              "type": "string",
              "example": "https://image_url.com"
            },
            "phone": {
              "type": "string",
              "example": "https://image_url.com"
            },
            "addresses": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/UserAddressDto"
              }
            }
          },
          "required": [
            "username",
            "avatar_url",
            "cover_url",
            "phone",
            "addresses"
          ]
        },
        "UpdatePasswordDto": {
          "type": "object",
          "properties": {
            "old_password": {
              "type": "string",
              "example": "Old password"
            },
            "new_password": {
              "type": "string",
              "example": "New password"
            }
          },
          "required": [
            "old_password",
            "new_password"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
