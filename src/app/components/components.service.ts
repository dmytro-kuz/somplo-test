import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  constructor() {}

  generateTemplate(body: any, styles?: string) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  ${body.innerHTML}
</body>
</html>
`;
  }
}
