import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import weatherRoutes from './utils/weatherRoutes';

ReactDOM.render(
  weatherRoutes,
  document.getElementById('root')
);
