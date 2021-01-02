import path from 'path';
import gateway from 'express-gateway';
import './users/index';
import './todo/index';

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
 