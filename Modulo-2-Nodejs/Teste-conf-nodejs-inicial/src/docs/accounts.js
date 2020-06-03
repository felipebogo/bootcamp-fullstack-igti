const docsAccounts =
{
  "swagger": "2.0",
  "info": {
    "description": "contas",
    "version": "1.0.0",
    "title": "Account"
  },
  "tags": [
    {
      "name": "Account",
      "description": "Accounts"
    }
  ],
  "host":"localhost:3000",
  "schemes": [
    "http"
  ],
  "paths": {
    "/account": {
      "post": {
        "tags": [
          "Account"
        ],
        "description": "adiciona conta",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "conta",
            "required": true,
            "schema": {
              "$ref": "#/definitions/account"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Sucesso"
          },
          "505": {
            "description": "Erro interno"
          }
        }
      }
    }
  },
  "definitions": {
    "account": {
      "type": "object",
      "required": [
        "name",
        "balance"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "balance": {
          "type": "number"
        }
      }
    }
  }
};

export default docsAccounts;