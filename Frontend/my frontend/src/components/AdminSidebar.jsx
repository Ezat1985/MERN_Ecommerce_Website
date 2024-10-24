import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillGearFill,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside id='sidebar'>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='product-list'>
            <BsFillArchiveFill className='icon' /> Products List
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='add-product'>
            <BsFillArchiveFill className='icon' /> Add Product
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsFillGrid3X3GapFill className='icon' /> Categories
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsPeopleFill className='icon' /> Customers
          </a>
        </li>

        <li className='sidebar-list-item'>
          <a href=''>
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/admin-panel/user-list'>
            <BsPeopleFill className='icon' /> Users Management
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
