#### React-Boilerplate
---
1. `npm i`

2. `npm start`

#### Changes
1. `npm i http-proxy-middleware -D` add frontend proxy middleware,`touch proxy.json` create proxy file.
```json
{
  "default": {
    "api": "http://localhost:8080",
    "endpoints": [
      "/api/*"
    ]
  }
}
```

2. `npm i antd` add ant-design.

3. `npm i less less-loader` add less. `npm i sass node-sass sass-loader` add sass.