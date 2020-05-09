import HomeScreen from '../home/HomeViewContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';
import Icon from 'react-native-vector-icons/FontAwesome5';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/icons852.png');
const iconGrids = require('../../../assets/images/tabbar/about.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/setting.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Request list',
    component: CalendarScreen,
    icon: iconCalendar,
  },
  {
    name: 'About Us',
    component: GridsScreen,
    icon: iconGrids,
  },
  {
    name: 'Pages',
    component: PagesScreen,
    icon: iconPages,
  },
  {
    name: 'Settings',
    component: ComponentsScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;