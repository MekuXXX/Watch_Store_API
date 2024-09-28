
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
          "summary": "Welcome API route for the watch store APIs",
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
          "summary": "User Signup",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User signed up successfully",
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
              "description": "Email is already exists",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Email is already exists"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/signin": {
        "post": {
          "operationId": "AuthController_signin",
          "summary": "User Signin",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SignInUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User signed in successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User signed in correctly",
                      "data": {
                        "token": "jwt-token",
                        "userData": {
                          "id": "user-id",
                          "username": "Youssef",
                          "email": "example@example.com",
                          "image": "user-avatar-url"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Incorrect email or password",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Email or Password is not correct"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Email does not exist",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Email is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/verify-email/{token}": {
        "post": {
          "operationId": "AuthController_verifyEmail",
          "summary": "Verify User Email",
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
              "description": "User has been activated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been activated successfully",
                      "data": {
                        "token": "jwt-token",
                        "userData": {
                          "id": "user-id",
                          "username": "Youssef",
                          "email": "example@example.com",
                          "avatar_url": "user-avatar-url",
                          "role": "user-role"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "The token does not exist or is expired",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "The token is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/forget-password": {
        "post": {
          "operationId": "AuthController_forgetPassword",
          "summary": "Request Password Reset",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForgetPasswordDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Reset mail has been sent successfully",
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
            "404": {
              "description": "Email does not exist",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Email is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/reset-password/{token}": {
        "post": {
          "operationId": "AuthController_resetPassword",
          "summary": "Reset User Password",
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
                  "$ref": "#/components/schemas/ResetPasswordDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password has been reset successfully",
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
            "400": {
              "description": "Token is not exist or has expired",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Token is not exist, Please try again"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/validate-reset/{token}": {
        "get": {
          "operationId": "AuthController_validateResetToken",
          "summary": "Validate Password Reset Token",
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
              "description": "Token is valid for use",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Token is valid to be used"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Token is not exist or has expired",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Token is expired"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/users": {
        "get": {
          "operationId": "UsersController_findAll",
          "summary": "Get all users",
          "parameters": [
            {
              "name": "query",
              "required": true,
              "in": "query",
              "example": "John",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": true,
              "in": "query",
              "example": 1,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "example": 10,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of users retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Got the users successfully",
                      "data": {
                        "users": [
                          {
                            "id": "1",
                            "username": "john_doe",
                            "email": "john@example.com",
                            "avatar_url": "http://example.com/avatar.jpg",
                            "cover_url": "http://example.com/cover.jpg",
                            "phone": "+123456789",
                            "role": "user"
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden if user is not admin",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
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
      "/api/users/current": {
        "get": {
          "operationId": "UsersController_current",
          "summary": "Get current user information",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Current user information retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been obtained successfully",
                      "data": {
                        "userData": {
                          "id": "1",
                          "username": "john_doe",
                          "email": "john@example.com",
                          "avatar_url": "http://example.com/avatar.jpg",
                          "cover_url": "http://example.com/cover.jpg",
                          "phone": "+123456789"
                        }
                      }
                    }
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
          "summary": "Update current user information",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Data for updating user information",
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
              "description": "User updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been updated successfully",
                      "data": {
                        "userData": {
                          "id": "1",
                          "username": "john_updated",
                          "email": "john_updated@example.com",
                          "avatar_url": "http://example.com/avatar.jpg",
                          "cover_url": "http://example.com/cover.jpg",
                          "phone": "+123456789"
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "User does not exist"
                    }
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
          "summary": "Delete current user",
          "parameters": [],
          "responses": {
            "200": {
              "description": "User deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "user": {
                          "id": "1",
                          "username": "john_doe"
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "User does not exist"
                    }
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
      "/api/users/{id}": {
        "get": {
          "operationId": "UsersController_findOne",
          "summary": "Get a user by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "1",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been obtained successfully",
                      "data": {
                        "userData": {
                          "id": "1",
                          "username": "john_doe",
                          "email": "john@example.com",
                          "avatar_url": "http://example.com/avatar.jpg",
                          "cover_url": "http://example.com/cover.jpg",
                          "phone": "+123456789",
                          "addresses": []
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden if user is not admin",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "User does not exist"
                    }
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
          "summary": "Update a user by admin",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "1",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Data for updating user information",
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
              "description": "User updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User has been updated successfully",
                      "data": {
                        "userData": {
                          "id": "1",
                          "username": "john_updated",
                          "email": "john_updated@example.com",
                          "avatar_url": "http://example.com/avatar.jpg",
                          "cover_url": "http://example.com/cover.jpg",
                          "phone": "+123456789"
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden if user is not admin",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "User does not exist"
                    }
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
          "summary": "Delete a user by admin",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "1",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "403": {
              "description": "Forbidden if user is not admin",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "User does not exist"
                    }
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
          "summary": "Update current user password",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Data for updating password",
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
              "description": "Password updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "User password updated successfully"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Old password is wrong",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Old password is wrong"
                    }
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
      "/api/categories": {
        "post": {
          "operationId": "CategoriesController_create",
          "summary": "Create a new category (Admin only)",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCategoryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Category created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Category created successfully",
                      "data": {
                        "category": {
                          "id": "1",
                          "name": "Books",
                          "cover_url": "https://example.com/book-cover.jpg"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input or missing fields",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Must provide valid data to create a category"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden resource"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Categories"
          ]
        },
        "get": {
          "operationId": "CategoriesController_findAll",
          "summary": "Get all categories with pagination and search",
          "parameters": [
            {
              "name": "query",
              "required": false,
              "in": "query",
              "description": "Search term to filter categories by name",
              "schema": {}
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "schema": {}
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of categories per page",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "Categories retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Got the categories successfully",
                      "data": {
                        "categories": [
                          {
                            "id": "1",
                            "name": "Books",
                            "cover_url": "https://example.com/book-cover.jpg"
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid query parameters",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Invalid query parameters"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Categories"
          ]
        }
      },
      "/api/categories/{value}": {
        "get": {
          "operationId": "CategoriesController_findOne",
          "summary": "Get a category by ID or name",
          "parameters": [
            {
              "name": "value",
              "required": true,
              "in": "path",
              "description": "ID or name of the category",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "type",
              "required": true,
              "in": "query",
              "description": "Search category by either id or name",
              "schema": {
                "enum": [
                  "id",
                  "name"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Category retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Getting the category successfully",
                      "data": {
                        "category": {
                          "id": "1",
                          "name": "Books",
                          "cover_url": "https://example.com/book-cover.jpg"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid type query parameter",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Must provide the way to find the category"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Category not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Category is not found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Categories"
          ]
        },
        "patch": {
          "operationId": "CategoriesController_update",
          "summary": "Update a category by ID or name (Admin only)",
          "parameters": [
            {
              "name": "value",
              "required": true,
              "in": "path",
              "description": "ID or name of the category",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "type",
              "required": true,
              "in": "query",
              "description": "Update category by either id or name",
              "schema": {
                "enum": [
                  "id",
                  "name"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCategoryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Category updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Category updated successfully",
                      "data": {
                        "category": {
                          "id": "1",
                          "name": "Updated Books",
                          "cover_url": "https://example.com/updated-book-cover.jpg"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Missing fields or invalid data",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Must provide data to update the category"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden resource"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Categories"
          ]
        },
        "delete": {
          "operationId": "CategoriesController_remove",
          "summary": "Delete a category by ID or name (Admin only)",
          "parameters": [
            {
              "name": "value",
              "required": true,
              "in": "path",
              "description": "ID or name of the category",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "type",
              "required": true,
              "in": "query",
              "description": "Delete category by either id or name",
              "schema": {
                "enum": [
                  "id",
                  "name"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Category deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Category deleted successfully",
                      "data": {
                        "category": {
                          "id": "1",
                          "name": "Books",
                          "cover_url": "https://example.com/book-cover.jpg"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Category does not exist",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Category does not exist"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden resource"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Categories"
          ]
        }
      },
      "/api/products": {
        "post": {
          "operationId": "ProductsController_create",
          "summary": "Create a new product (Admin only)",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateProductDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Product created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "product": {
                          "id": "123e4567-e89b-12d3-a456-426614174000",
                          "name": "Sample Product",
                          "description": "This is a sample product",
                          "image_url": "http://example.com/product.png",
                          "quantity": 100,
                          "price": 25.5
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden resource"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ]
        },
        "get": {
          "operationId": "ProductsController_findAll",
          "summary": "Retrieve all products",
          "parameters": [
            {
              "name": "query",
              "required": false,
              "in": "query",
              "description": "Search query",
              "schema": {}
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Pagination page",
              "schema": {}
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit the number of results",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved products",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Got the products successfully",
                      "data": {
                        "products": [
                          {
                            "id": "123e4567-e89b-12d3-a456-426614174000",
                            "name": "Sample Product",
                            "description": "This is a sample product",
                            "image_url": "http://example.com/product.png",
                            "quantity": 100,
                            "price": 25.5
                          }
                        ]
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ]
        }
      },
      "/api/products/{id}": {
        "get": {
          "operationId": "ProductsController_findOne",
          "summary": "Retrieve a product by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Product ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Product found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "product": {
                          "id": "123e4567-e89b-12d3-a456-426614174000",
                          "name": "Sample Product",
                          "description": "This is a sample product",
                          "image_url": "http://example.com/product.png",
                          "quantity": 100,
                          "price": 25.5
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Product not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Product is not found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ]
        },
        "patch": {
          "operationId": "ProductsController_update",
          "summary": "Update a product by ID (Admin only)",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Product ID",
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
                  "$ref": "#/components/schemas/UpdateProductDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Product updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "product": {
                          "id": "123e4567-e89b-12d3-a456-426614174000",
                          "name": "Updated Product",
                          "description": "This is an updated product",
                          "image_url": "http://example.com/product-updated.png",
                          "quantity": 80,
                          "price": 30
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden resource"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Product not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Product is not found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ]
        },
        "delete": {
          "operationId": "ProductsController_remove",
          "summary": "Delete a product by ID (Admin only)",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Product ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Product deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "product": {
                          "id": "123e4567-e89b-12d3-a456-426614174000",
                          "name": "Deleted Product",
                          "description": "This is a deleted product",
                          "image_url": "http://example.com/product.png",
                          "quantity": 0,
                          "price": 0
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden resource"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Product not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Product is not found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ]
        }
      },
      "/api/wishlists/current": {
        "get": {
          "operationId": "WishlistsController_getCurrentUserWishlists",
          "summary": "Get wishlists of the current user",
          "parameters": [
            {
              "name": "page",
              "required": true,
              "in": "query",
              "example": 1,
              "schema": {}
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "example": 10,
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved wishlists.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlists": [
                          {
                            "product": {
                              "id": "uuid",
                              "name": "Product A",
                              "price": 100
                            },
                            "user": {
                              "id": "uuid",
                              "username": "User A"
                            },
                            "created_at": "2024-09-01T00:00:00.000Z",
                            "updated_at": "2024-09-01T00:00:00.000Z"
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        },
        "post": {
          "operationId": "WishlistsController_createWishlistForCurrentUser",
          "summary": "Create a wishlist for the current user",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateWishlistDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Wishlist created successfully.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlist": {
                          "user_id": "uuid",
                          "product_id": "uuid"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "User or product does not exist.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "User/Product does not exist"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        }
      },
      "/api/wishlists": {
        "get": {
          "operationId": "WishlistsController_getSystemWishlists",
          "summary": "Get all system wishlists (Admin only)",
          "parameters": [
            {
              "name": "page",
              "required": true,
              "in": "query",
              "example": 1,
              "schema": {}
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "example": 10,
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved all system wishlists.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlists": []
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "User is not an admin.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        }
      },
      "/api/wishlists/users/{userId}": {
        "get": {
          "operationId": "WishlistsController_getUserWishlists",
          "summary": "Get wishlists of a specific user (Admin only)",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "example": "uuid",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": true,
              "in": "query",
              "example": 1,
              "schema": {}
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "example": 10,
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved user wishlists.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlists": []
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "User is not an admin.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        }
      },
      "/api/wishlists/current/{wishlistId}": {
        "get": {
          "operationId": "WishlistsController_getCurrentUserWishlist",
          "summary": "Get a specific wishlist of the current user",
          "parameters": [
            {
              "name": "wishlistId",
              "required": true,
              "in": "path",
              "example": "uuid",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved wishlist.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "user": {
                          "id": "uuid",
                          "username": "User A"
                        },
                        "product": {
                          "id": "uuid",
                          "name": "Product A"
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Wishlist not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Wishlist is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        },
        "delete": {
          "operationId": "WishlistsController_deleteCurrentUserWishlist",
          "summary": "Delete a wishlist for the current user",
          "parameters": [
            {
              "name": "wishlistId",
              "required": true,
              "in": "path",
              "example": "uuid",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Wishlist deleted successfully.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlist": {}
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Wishlist not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Wishlist is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        }
      },
      "/api/wishlists/{wishlistId}": {
        "get": {
          "operationId": "WishlistsController_getUserWishlist",
          "summary": "Get a specific wishlist (Admin only)",
          "parameters": [
            {
              "name": "wishlistId",
              "required": true,
              "in": "path",
              "example": "uuid",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved wishlist.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "user": {
                          "id": "uuid",
                          "username": "User A"
                        },
                        "product": {
                          "id": "uuid",
                          "name": "Product A"
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "User is not an admin.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Wishlist not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Wishlist is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        },
        "delete": {
          "operationId": "WishlistsController_deleteUserWishlist",
          "summary": "Delete a wishlist (Admin only)",
          "parameters": [
            {
              "name": "wishlistId",
              "required": true,
              "in": "path",
              "example": "uuid",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Wishlist deleted successfully.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlist": {}
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "User is not an admin.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Wishlist not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Wishlist is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        }
      },
      "/api/wishlists/{userId}": {
        "post": {
          "operationId": "WishlistsController_createWishlistForUser",
          "summary": "Create a wishlist for a specific user (Admin only)",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "example": "afc81383-2f9f-4af9-906e-e8cd09c1d96e",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "productId",
              "required": true,
              "in": "query",
              "example": "afc81383-2f9f-4af9-906e-e8cd09c1d96e",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Wishlist created successfully.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlist": {
                          "user_id": "uuid",
                          "product_id": "uuid"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "User or product does not exist.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "User/Product does not exist"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "User is not authenticated.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Unauthorized"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "User is not an admin.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Wishlists"
          ]
        }
      },
      "/api/payments/stripe/checkout-session": {
        "post": {
          "operationId": "PaymentController_createStripeSession",
          "summary": "Create a new Stripe checkout session for the user",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Data required to create a Stripe session",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateStripeSessionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Stripe session created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "session_url": "https://checkout.stripe.com/pay/cs_test_123"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden. User is not authorized to perform this action.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Forbidden"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "One of the products does not exist",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "One of the products is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Payments"
          ]
        }
      },
      "/api/payments/stripe/webhook": {
        "post": {
          "operationId": "PaymentController_stripeWebhook",
          "summary": "Stripe webhook to handle session events",
          "parameters": [
            {
              "name": "stripe-signature",
              "required": true,
              "in": "header",
              "description": "Stripe webhook signature for validation",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Raw body from Stripe webhook event",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                },
                "examples": {
                  "validRequest": {
                    "summary": "Valid Request",
                    "value": {
                      "event": {
                        "id": "evt_1HKBmB2eZvKYlo2CcA4pmXma",
                        "type": "checkout.session.completed",
                        "data": {
                          "object": {
                            "metadata": {
                              "order_id": "order_1Gq2k2eZvKYlo2CC2poHp8n"
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
          "responses": {
            "200": {
              "description": "Stripe webhook event handled successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Event is handled correctly"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Webhook event is not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Event is not exist"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Payments"
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
        "CreateUserDto": {
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
        "SignInUserDto": {
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
        "ForgetPasswordDto": {
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
        "ResetPasswordDto": {
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
        },
        "CreateCategoryDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Men's"
            },
            "cover_url": {
              "type": "string",
              "example": "https://category_cover_url.com"
            }
          },
          "required": [
            "name",
            "cover_url"
          ]
        },
        "UpdateCategoryDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Men's"
            },
            "cover_url": {
              "type": "string",
              "example": "https://category_cover_url.com"
            }
          }
        },
        "CreateProductDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Wireless Headphones"
            },
            "description": {
              "type": "string",
              "example": "High-quality wireless headphones with noise cancellation."
            },
            "image_url": {
              "type": "string",
              "example": "https://image_url.com/headphones.jpg"
            },
            "quantity": {
              "type": "number",
              "example": 50
            },
            "price": {
              "type": "number",
              "example": 199.99
            }
          },
          "required": [
            "name",
            "description",
            "image_url",
            "quantity",
            "price"
          ]
        },
        "UpdateProductDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Wireless Headphones"
            },
            "description": {
              "type": "string",
              "example": "High-quality wireless headphones with noise cancellation."
            },
            "image_url": {
              "type": "string",
              "example": "https://image_url.com/headphones.jpg"
            },
            "quantity": {
              "type": "number",
              "example": 50
            },
            "price": {
              "type": "number",
              "example": 199.99
            }
          }
        },
        "CreateWishlistDto": {
          "type": "object",
          "properties": {
            "user_id": {
              "type": "string",
              "example": "123e4567-e89b-12d3-a456-426614174000"
            },
            "product_id": {
              "type": "string",
              "example": "562e4567-e89b-12d3-a456-897927957937"
            }
          },
          "required": [
            "user_id",
            "product_id"
          ]
        },
        "CreateStripeSessionDto": {
          "type": "object",
          "properties": {
            "cart_items": {
              "example": [
                {
                  "product_id": "3bae0f35-f08f-4086-9169-c9e2036aadc1",
                  "quantity": 5
                },
                {
                  "product_id": "d4335b9a-2a13-4acf-9dc9-7a565c989585",
                  "quantity": 3
                }
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "cart_items"
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
