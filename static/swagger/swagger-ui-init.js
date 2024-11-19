
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
            "Authentication"
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
            "Authentication"
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
            "Authentication"
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
            "Authentication"
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
            "Authentication"
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
            "Authentication"
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
                      "message": "Product created successfully",
                      "data": {
                        "product": {
                          "id": "123e4567-e89b-12d3-a456-426614174000",
                          "name": "Wireless Headphones",
                          "description": "High-quality wireless headphones with noise cancellation.",
                          "image_url": "http://example.com/headphones.jpg",
                          "quantity": 50,
                          "price": 199.99
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
              "description": "Some category names do not exist",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Some category names do not exist"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error occurred during product creation",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Error occurred during product creation: <error message>"
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
              "name": "categories",
              "required": true,
              "in": "query",
              "examples": [
                "man",
                "women",
                "man,women"
              ],
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "minPrice",
              "required": true,
              "in": "query",
              "example": 50,
              "description": "Search in with this minimum price",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "maxPrice",
              "required": true,
              "in": "query",
              "example": 999999,
              "description": "Search in with this maximum price",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "minQuantity",
              "required": true,
              "in": "query",
              "example": 75,
              "description": "Search in with this minimum quantity",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "maxQuantity",
              "required": true,
              "in": "query",
              "example": 750,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "maxQunatity",
              "required": true,
              "in": "query",
              "description": "Search in with this maximum quantity",
              "schema": {}
            },
            {
              "name": "query",
              "required": false,
              "in": "query",
              "description": "Search in name and description of the product",
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
                            "price": 25.5,
                            "categories": [
                              "Electronics",
                              "Accessories"
                            ]
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
                          "price": 25.5,
                          "categories": [
                            "Electronics",
                            "Accessories"
                          ]
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
            },
            "500": {
              "description": "Error occurred during updating product relations",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Error occurred during updating product relations: <error message>"
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
          "summary": "Get current user wishlists",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The list of current user wishlists",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlists": [
                          {
                            "created_at": "2024-11-14T00:00:00Z",
                            "updated_at": "2024-11-14T00:00:00Z",
                            "product": {
                              "id": "product-id",
                              "name": "Product 1",
                              "description": "Description of Product 1",
                              "image_url": "https://example.com/image.jpg",
                              "price": 99.99,
                              "quantity": 10
                            },
                            "user": {
                              "id": "user-id",
                              "username": "user123",
                              "email": "user@example.com",
                              "avatar_url": "https://example.com/avatar.jpg",
                              "role": "user"
                            }
                          }
                        ]
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
                      "message": "User not found"
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
          "summary": "Get all wishlists in the system (Admin only)",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The list of all wishlists in the system",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlists": [
                          {
                            "created_at": "2024-11-14T00:00:00Z",
                            "updated_at": "2024-11-14T00:00:00Z",
                            "product": {
                              "id": "product-id",
                              "name": "Product 1",
                              "description": "Description of Product 1",
                              "image_url": "https://example.com/image.jpg",
                              "price": 99.99,
                              "quantity": 10
                            },
                            "user": {
                              "id": "user-id",
                              "username": "user123",
                              "email": "user@example.com",
                              "avatar_url": "https://example.com/avatar.jpg",
                              "role": "user"
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Admin role required",
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
          "summary": "Get specific user wishlists (Admin only)",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "description": "User ID",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The list of wishlists for the specified user",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlists": [
                          {
                            "created_at": "2024-11-14T00:00:00Z",
                            "updated_at": "2024-11-14T00:00:00Z",
                            "product": {
                              "id": "product-id",
                              "name": "Product 1",
                              "description": "Description of Product 1",
                              "image_url": "https://example.com/image.jpg",
                              "price": 99.99,
                              "quantity": 10
                            },
                            "user": {
                              "id": "user-id",
                              "username": "user123",
                              "email": "user@example.com",
                              "avatar_url": "https://example.com/avatar.jpg",
                              "role": "user"
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Admin role required",
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
      "/api/wishlists/current/{productId}": {
        "get": {
          "operationId": "WishlistsController_getCurrentUserWishlist",
          "summary": "Get current user wishlist for a specific product",
          "parameters": [
            {
              "name": "productId",
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
              "description": "The wishlist entry for the specified product",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlist": {
                          "created_at": "2024-11-14T00:00:00Z",
                          "updated_at": "2024-11-14T00:00:00Z",
                          "product": {
                            "id": "product-id",
                            "name": "Product 1",
                            "description": "Description of Product 1",
                            "image_url": "https://example.com/image.jpg",
                            "price": 99.99,
                            "quantity": 10
                          },
                          "user": {
                            "id": "user-id",
                            "username": "user123",
                            "email": "user@example.com",
                            "avatar_url": "https://example.com/avatar.jpg",
                            "role": "user"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Wishlist entry not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Wishlist is not found"
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
          "operationId": "WishlistsController_addProductToCurrentUserWishlist",
          "summary": "Create wishlist for current user",
          "parameters": [
            {
              "name": "productId",
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
            "description": "Request body to create a wishlist",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Object"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Wishlist created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "created_at": "2024-11-14T00:00:00Z",
                        "updated_at": "2024-11-14T00:00:00Z",
                        "product": {
                          "id": "product-id",
                          "name": "Product 1",
                          "description": "Description of Product 1",
                          "image_url": "https://example.com/image.jpg",
                          "price": 99.99,
                          "quantity": 10
                        },
                        "user": {
                          "id": "user-id",
                          "username": "user123",
                          "email": "user@example.com",
                          "avatar_url": "https://example.com/avatar.jpg",
                          "role": "user"
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Invalid request",
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
              "description": "Product not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Product not found"
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
          "operationId": "WishlistsController_removeProductFromCurrentUserWishlist",
          "summary": "Remove product from current user wishlist",
          "parameters": [
            {
              "name": "productId",
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
              "description": "Wishlist removed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Product removed from wishlist"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Wishlist entry not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Wishlist entry not found"
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
      "/api/wishlists/{userId}/{productId}": {
        "get": {
          "operationId": "WishlistsController_getUserWishlist",
          "summary": "Get a specific user wishlist for a specific product (Admin only)",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "description": "User ID",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "productId",
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
              "description": "The wishlist entry for the specified product and user",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "wishlist": {
                          "created_at": "2024-11-14T00:00:00Z",
                          "updated_at": "2024-11-14T00:00:00Z",
                          "product": {
                            "id": "product-id",
                            "name": "Product 1",
                            "description": "Description of Product 1",
                            "image_url": "https://example.com/image.jpg",
                            "price": 99.99,
                            "quantity": 10
                          },
                          "user": {
                            "id": "user-id",
                            "username": "user123",
                            "email": "user@example.com",
                            "avatar_url": "https://example.com/avatar.jpg",
                            "role": "user"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Admin role required",
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
        },
        "post": {
          "operationId": "WishlistsController_addProductToUserWishlist",
          "summary": "Create wishlist for a specific user (Admin only)",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "description": "User ID",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "productId",
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
              "description": "Wishlist created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "data": {
                        "created_at": "2024-11-14T00:00:00Z",
                        "updated_at": "2024-11-14T00:00:00Z",
                        "product": {
                          "id": "product-id",
                          "name": "Product 1",
                          "description": "Description of Product 1",
                          "image_url": "https://example.com/image.jpg",
                          "price": 99.99,
                          "quantity": 10
                        },
                        "user": {
                          "id": "user-id",
                          "username": "user123",
                          "email": "user@example.com",
                          "avatar_url": "https://example.com/avatar.jpg",
                          "role": "user"
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Admin role required",
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
        },
        "delete": {
          "operationId": "WishlistsController_removeProductFromUserWishlist",
          "summary": "Remove product from specific user wishlist (Admin only)",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "description": "User ID",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "productId",
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
              "description": "Wishlist entry removed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Product removed from wishlist"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Admin role required",
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
          "operationId": "PaymentsController_createStripeSession",
          "summary": "Create a new Stripe checkout session for the user",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Data required to create a Stripe session",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePaymentOrderDto"
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
      "/api/payments/stripe/checkout-data/{id}": {
        "get": {
          "operationId": "PaymentsController_stripeSessionData",
          "summary": "Retrieve Stripe checkout session data by session ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Stripe session ID",
              "example": "cs_test_a1b2c3d4e5f6g7h8i9j0",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Retrieved checkout data successfully.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Getted the checkout data successfully",
                      "data": {
                        "order": {
                          "id": "003b8d1d-c261-4f87-8347-0f8116bd86ab",
                          "user_id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                          "checkout_id": "",
                          "price": 0,
                          "status": "shipping",
                          "created_at": "2024-09-28T15:39:52.701Z",
                          "updated_at": "2024-09-28T15:39:52.701Z",
                          "user": {
                            "id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                            "username": "Mahmoud",
                            "email": "ridadi4756@sgatra.com",
                            "avatar_url": null,
                            "cover_url": null,
                            "phone": null,
                            "role": "admin"
                          },
                          "order_items": [
                            {
                              "product": {
                                "id": "b2d652b0-af99-49d5-8dfe-6cfef785d033",
                                "name": "Bespoke Fresh Gloves",
                                "description": "New ABC 13 9370...",
                                "image_url": "https://picsum.photos/seed/aPqsmYPQ/640/480",
                                "quantity": 811700361,
                                "price": 0.08724776655435562,
                                "created_at": "2024-09-28T14:49:31.592Z",
                                "updated_at": "2024-09-28T14:49:31.592Z"
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Checkout session or associated order not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Checkout data is not exist"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server error retrieving Stripe checkout session data.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "An error occurred during retrieval"
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
          "operationId": "PaymentsController_stripeWebhook",
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
      },
      "/api/payments/cash-delivery": {
        "post": {
          "operationId": "PaymentsController_cashOnDelivery",
          "summary": "Create a cash on delivery order",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Details of the order being created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePaymentOrderDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Order created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Order created successfully",
                      "data": {
                        "order": {
                          "id": "order_1Gq2k2eZvKYlo2CC2poHp8n",
                          "user_id": "user_1",
                          "status": "cash_delivery",
                          "price": 150,
                          "order_items": [
                            {
                              "product_id": "prod_123",
                              "quantity": 2
                            },
                            {
                              "product_id": "prod_456",
                              "quantity": 1
                            }
                          ]
                        }
                      }
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
      "/api/orders": {
        "get": {
          "operationId": "OrdersController_findAll",
          "summary": "Get all orders (Admin)",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Got the orders successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Got the orders successfully",
                      "data": {
                        "orders": [
                          {
                            "id": "003b8d1d-c261-4f87-8347-0f8116bd86ab",
                            "user_id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                            "checkout_id": "",
                            "price": 0,
                            "status": "shipping",
                            "created_at": "2024-09-28T15:39:52.701Z",
                            "updated_at": "2024-09-28T15:39:52.701Z",
                            "user": {
                              "id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                              "username": "Mahmoud",
                              "email": "ridadi4756@sgatra.com",
                              "avatar_url": null,
                              "cover_url": null,
                              "phone": null,
                              "role": "admin"
                            },
                            "order_items": [
                              {
                                "product": {
                                  "id": "b2d652b0-af99-49d5-8dfe-6cfef785d033",
                                  "name": "Bespoke Fresh Gloves",
                                  "description": "New ABC 13 9370...",
                                  "image_url": "https://picsum.photos/seed/aPqsmYPQ/640/480",
                                  "quantity": 811700361,
                                  "price": 0.08724776655435562,
                                  "created_at": "2024-09-28T14:49:31.592Z",
                                  "updated_at": "2024-09-28T14:49:31.592Z"
                                }
                              }
                            ]
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden, user is not an admin"
            }
          },
          "tags": [
            "Orders"
          ]
        }
      },
      "/api/orders/current": {
        "get": {
          "operationId": "OrdersController_findUserAll",
          "summary": "Get current user orders",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Got the orders successfully for the current user",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Got the orders successfully",
                      "data": {
                        "orders": [
                          {
                            "id": "003b8d1d-c261-4f87-8347-0f8116bd86ab",
                            "user_id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                            "checkout_id": "",
                            "price": 0,
                            "status": "shipping",
                            "created_at": "2024-09-28T15:39:52.701Z",
                            "updated_at": "2024-09-28T15:39:52.701Z",
                            "user": {
                              "id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                              "username": "Mahmoud",
                              "email": "ridadi4756@sgatra.com",
                              "avatar_url": null,
                              "cover_url": null,
                              "phone": null,
                              "role": "admin"
                            },
                            "order_items": [
                              {
                                "product": {
                                  "id": "b2d652b0-af99-49d5-8dfe-6cfef785d033",
                                  "name": "Bespoke Fresh Gloves",
                                  "description": "New ABC 13 9370...",
                                  "image_url": "https://picsum.photos/seed/aPqsmYPQ/640/480",
                                  "quantity": 811700361,
                                  "price": 0.08724776655435562,
                                  "created_at": "2024-09-28T14:49:31.592Z",
                                  "updated_at": "2024-09-28T14:49:31.592Z"
                                }
                              }
                            ]
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
            "Orders"
          ]
        }
      },
      "/api/orders/{id}": {
        "get": {
          "operationId": "OrdersController_findOne",
          "summary": "Get an order by ID (Admin)",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Order ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Got the order successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Getting the order successfully",
                      "data": {
                        "order": {
                          "id": "003b8d1d-c261-4f87-8347-0f8116bd86ab",
                          "user_id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                          "checkout_id": "",
                          "price": 0,
                          "status": "shipping",
                          "created_at": "2024-09-28T15:39:52.701Z",
                          "updated_at": "2024-09-28T15:39:52.701Z",
                          "user": {
                            "id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                            "username": "Mahmoud",
                            "email": "ridadi4756@sgatra.com",
                            "avatar_url": null,
                            "cover_url": null,
                            "phone": null,
                            "role": "admin"
                          },
                          "order_items": [
                            {
                              "product": {
                                "id": "b2d652b0-af99-49d5-8dfe-6cfef785d033",
                                "name": "Bespoke Fresh Gloves",
                                "description": "New ABC 13 9370...",
                                "image_url": "https://picsum.photos/seed/aPqsmYPQ/640/480",
                                "quantity": 811700361,
                                "price": 0.08724776655435562,
                                "created_at": "2024-09-28T14:49:31.592Z",
                                "updated_at": "2024-09-28T14:49:31.592Z"
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden, user is not an admin"
            },
            "404": {
              "description": "Order not found or does not belong to the user",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 404,
                      "message": "Checkout data is not exist",
                      "error": "Not Found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Orders"
          ]
        },
        "patch": {
          "operationId": "OrdersController_updateAdmin",
          "summary": "Update an order by ID ( shipping, cash_delivery, preparing, finished, cancelled ) (Admin)",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Order ID",
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
                  "$ref": "#/components/schemas/UpdateOrderDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated the order successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Updated the order successfully",
                      "data": {
                        "order": {
                          "id": "003b8d1d-c261-4f87-8347-0f8116bd86ab",
                          "user_id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                          "checkout_id": "",
                          "price": 0,
                          "status": "preparing",
                          "created_at": "2024-09-28T15:39:52.701Z",
                          "updated_at": "2024-09-29T15:39:52.701Z",
                          "user": {
                            "id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                            "username": "Mahmoud",
                            "email": "ridadi4756@sgatra.com",
                            "avatar_url": null,
                            "cover_url": null,
                            "phone": null,
                            "role": "admin"
                          },
                          "order_items": [
                            {
                              "product": {
                                "id": "b2d652b0-af99-49d5-8dfe-6cfef785d033",
                                "name": "Bespoke Fresh Gloves",
                                "description": "New ABC 13 9370...",
                                "image_url": "https://picsum.photos/seed/aPqsmYPQ/640/480",
                                "quantity": 811700361,
                                "price": 0.08724776655435562,
                                "created_at": "2024-09-28T14:49:31.592Z",
                                "updated_at": "2024-09-28T14:49:31.592Z"
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Order not found"
            }
          },
          "tags": [
            "Orders"
          ]
        },
        "delete": {
          "operationId": "OrdersController_remove",
          "summary": "Delete an order by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Order ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Deleted the order successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Deleted the order successfully",
                      "data": {
                        "order": {
                          "order": {
                            "id": "003b8d1d-c261-4f87-8347-0f8116bd86ab",
                            "user_id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                            "checkout_id": "",
                            "price": 0,
                            "status": "shipping",
                            "created_at": "2024-09-28T15:39:52.701Z",
                            "updated_at": "2024-09-28T15:39:52.701Z",
                            "user": {
                              "id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                              "username": "Mahmoud",
                              "email": "ridadi4756@sgatra.com",
                              "avatar_url": null,
                              "cover_url": null,
                              "phone": null,
                              "role": "admin"
                            },
                            "order_items": [
                              {
                                "product": {
                                  "id": "b2d652b0-af99-49d5-8dfe-6cfef785d033",
                                  "name": "Bespoke Fresh Gloves",
                                  "description": "New ABC 13 9370...",
                                  "image_url": "https://picsum.photos/seed/aPqsmYPQ/640/480",
                                  "quantity": 811700361,
                                  "price": 0.08724776655435562,
                                  "created_at": "2024-09-28T14:49:31.592Z",
                                  "updated_at": "2024-09-28T14:49:31.592Z"
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Order not found"
            }
          },
          "tags": [
            "Orders"
          ]
        }
      },
      "/api/orders/current/{id}": {
        "get": {
          "operationId": "OrdersController_findUserOrder",
          "summary": "Get a specific order for the current user",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Order ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Got the order successfully for the current user",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Getting the order successfully",
                      "data": {
                        "order": {
                          "id": "003b8d1d-c261-4f87-8347-0f8116bd86ab",
                          "user_id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                          "checkout_id": "",
                          "price": 0,
                          "status": "shipping",
                          "created_at": "2024-09-28T15:39:52.701Z",
                          "updated_at": "2024-09-28T15:39:52.701Z",
                          "user": {
                            "id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                            "username": "Mahmoud",
                            "email": "ridadi4756@sgatra.com",
                            "avatar_url": null,
                            "cover_url": null,
                            "phone": null,
                            "role": "user"
                          },
                          "order_items": [
                            {
                              "product": {
                                "id": "b2d652b0-af99-49d5-8dfe-6cfef785d033",
                                "name": "Bespoke Fresh Gloves",
                                "description": "New ABC 13 9370...",
                                "image_url": "https://picsum.photos/seed/aPqsmYPQ/640/480",
                                "quantity": 811700361,
                                "price": 0.08724776655435562,
                                "created_at": "2024-09-28T14:49:31.592Z",
                                "updated_at": "2024-09-28T14:49:31.592Z"
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Unauthorized access, user does not own this order"
            },
            "404": {
              "description": "Order not found or does not belong to the user",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 404,
                      "message": "Checkout data is not exist",
                      "error": "Not Found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Orders"
          ]
        },
        "patch": {
          "operationId": "OrdersController_updateUser",
          "summary": "Update the order status for the current user ( canceled )",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Order ID",
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
                  "$ref": "#/components/schemas/UpdateOrderDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated the order successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Updated the order successfully",
                      "data": {
                        "order": {
                          "id": "003b8d1d-c261-4f87-8347-0f8116bd86ab",
                          "user_id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                          "checkout_id": "",
                          "price": 0,
                          "status": "cancelled",
                          "created_at": "2024-09-28T15:39:52.701Z",
                          "updated_at": "2024-09-29T15:39:52.701Z",
                          "user": {
                            "id": "7854e4d4-344e-4dfd-969c-141060c90c28",
                            "username": "Mahmoud",
                            "email": "ridadi4756@sgatra.com",
                            "avatar_url": null,
                            "cover_url": null,
                            "phone": null,
                            "role": "admin"
                          },
                          "order_items": [
                            {
                              "product": {
                                "id": "b2d652b0-af99-49d5-8dfe-6cfef785d033",
                                "name": "Bespoke Fresh Gloves",
                                "description": "New ABC 13 9370...",
                                "image_url": "https://picsum.photos/seed/aPqsmYPQ/640/480",
                                "quantity": 811700361,
                                "price": 0.08724776655435562,
                                "created_at": "2024-09-28T14:49:31.592Z",
                                "updated_at": "2024-09-28T14:49:31.592Z"
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Order is not found"
            }
          },
          "tags": [
            "Orders"
          ]
        }
      },
      "/api/coupons": {
        "post": {
          "operationId": "CouponsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCouponDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          }
        },
        "get": {
          "operationId": "CouponsController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/api/coupons/{id}": {
        "get": {
          "operationId": "CouponsController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "type",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "patch": {
          "operationId": "CouponsController_update",
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
                  "$ref": "#/components/schemas/UpdateCouponDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "delete": {
          "operationId": "CouponsController_remove",
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
              "description": ""
            }
          }
        }
      },
      "/api/others/numbers": {
        "get": {
          "operationId": "OthersController_numbers",
          "summary": "Get the number of wishlists for a specific user",
          "description": "Returns the total number of wishlists associated with the specified user. Restricted to admin users.",
          "parameters": [],
          "responses": {
            "200": {
              "description": "The count of wishlists retrieved successfully.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Numbers got successfully",
                      "data": {
                        "wishlists": 5
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
                      "message": "User not found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Others"
          ]
        }
      },
      "/api/configurations": {
        "post": {
          "operationId": "ConfigurationsController_create",
          "summary": "Create a new configuration",
          "description": "Create a configuration entry. Only admins can access this route.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateConfigurationDto"
                },
                "examples": {
                  "example": {
                    "summary": "Example create configuration request",
                    "value": {
                      "key": "tax_rate",
                      "value": "15%",
                      "description": "Tax rate for orders"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Configuration created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Configuration created successfully",
                      "data": {
                        "configuration": {
                          "id": "1234",
                          "key": "tax_rate",
                          "value": "15%"
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Only admins can access this route",
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
            "Configurations"
          ]
        },
        "get": {
          "operationId": "ConfigurationsController_findAll",
          "summary": "Get all configurations",
          "description": "Retrieve a list of all configurations. Only admins can access this route.",
          "parameters": [],
          "responses": {
            "200": {
              "description": "All configurations retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "id": "1234",
                        "key": "tax_rate",
                        "value": "15%"
                      }
                    ]
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Only admins can access this route",
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
            "Configurations"
          ]
        }
      },
      "/api/configurations/{key}": {
        "get": {
          "operationId": "ConfigurationsController_findOne",
          "summary": "Get a configuration by key",
          "description": "Retrieve a specific configuration by its key. Only admins can access this route.",
          "parameters": [
            {
              "name": "key",
              "required": true,
              "in": "path",
              "description": "The key of the configuration to retrieve",
              "example": "tax_rate",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Configuration retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Configuration has gotten successfully",
                      "data": {
                        "configuration": {
                          "id": "1234",
                          "key": "tax_rate",
                          "value": "15%"
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Only admins can access this route",
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
              "description": "Configuration key is not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Configuration key is not found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Configurations"
          ]
        },
        "patch": {
          "operationId": "ConfigurationsController_update",
          "summary": "Update a configuration by key",
          "description": "Update a configuration entry by key. Only admins can access this route.",
          "parameters": [
            {
              "name": "key",
              "required": true,
              "in": "path",
              "description": "The key of the configuration to update",
              "example": "tax_rate",
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
                  "$ref": "#/components/schemas/UpdateConfigurationDto"
                },
                "examples": {
                  "example": {
                    "summary": "Example update configuration request",
                    "value": {
                      "value": "18%"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Configuration updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Configuration updated successfully",
                      "data": {
                        "configuration": {
                          "id": "1234",
                          "key": "tax_rate",
                          "value": "18%"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Must provide data for update configuration",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Must provide data for update configuration"
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Only admins can access this route",
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
              "description": "Configuration key is not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Configuration key is not found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Configurations"
          ]
        },
        "delete": {
          "operationId": "ConfigurationsController_remove",
          "summary": "Delete a configuration by key",
          "description": "Delete a specific configuration entry by its key. Only admins can access this route.",
          "parameters": [
            {
              "name": "key",
              "required": true,
              "in": "path",
              "description": "The key of the configuration to delete",
              "example": "tax_rate",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Configuration deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "message": "Configuration deleted successfully",
                      "data": {
                        "configuration": {
                          "id": "1234",
                          "key": "tax_rate",
                          "value": "15%"
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden: Only admins can access this route",
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
              "description": "Configuration key is not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": false,
                      "message": "Configuration key is not found"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Configurations"
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
            },
            "categories": {
              "example": [
                "7b5b7a69-9a10-4a53-8f63-b1e4f487437e",
                "92b1113c-52e4-46f8-9ae7-b9eb69c1e373"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "category_type": {
              "type": "string",
              "example": "id",
              "enum": [
                "id",
                "name"
              ]
            }
          },
          "required": [
            "name",
            "description",
            "image_url",
            "quantity",
            "price",
            "categories",
            "category_type"
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
            },
            "categories": {
              "example": [
                "7b5b7a69-9a10-4a53-8f63-b1e4f487437e",
                "92b1113c-52e4-46f8-9ae7-b9eb69c1e373"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "category_type": {
              "type": "string",
              "example": "id",
              "enum": [
                "id",
                "name"
              ]
            }
          }
        },
        "Object": {
          "type": "object",
          "properties": {}
        },
        "CreatePaymentOrderDto": {
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
        },
        "UpdateOrderDto": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "description": "The status of the order (shipping, cash_delivery, preparing, finished, cancelled)",
              "enum": [
                "shipping",
                "cash_delivery",
                "preparing",
                "finished",
                "cancelled"
              ],
              "example": "shipping"
            }
          },
          "required": [
            "status"
          ]
        },
        "CreateCouponDto": {
          "type": "object",
          "properties": {}
        },
        "UpdateCouponDto": {
          "type": "object",
          "properties": {}
        },
        "CreateConfigurationDto": {
          "type": "object",
          "properties": {}
        },
        "UpdateConfigurationDto": {
          "type": "object",
          "properties": {}
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
