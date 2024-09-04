
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
          }
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
            }
          }
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
            }
          }
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
            }
          }
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
            }
          }
        }
      },
      "/api/auth/reset-password": {
        "post": {
          "operationId": "AuthController_resetPassword",
          "parameters": [],
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
                      "message": "Password has been reseted successfully"
                    }
                  }
                }
              }
            }
          }
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
            }
          }
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
            }
          }
        },
        "delete": {
          "operationId": "UsersController_remove",
          "parameters": [],
          "responses": {
            "204": {
              "description": "Delete the user account"
            }
          }
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
            }
          }
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
            }
          }
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
            }
          }
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
            "token": {
              "type": "string",
              "example": "cutsze390284envr0x9023"
            },
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
            "token",
            "password",
            "confirmPassword"
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
            "password": {
              "type": "string",
              "example": "New very secret password"
            }
          },
          "required": [
            "username",
            "avatar_url",
            "password"
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
