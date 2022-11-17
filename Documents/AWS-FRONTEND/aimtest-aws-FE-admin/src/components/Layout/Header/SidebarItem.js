import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SidebarItem({ item, setShow }) {
  const router = useRouter();

  const userRole = useSelector((state) => state?.login?.userRole);

  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
        <div
          className='sidebar-title'
          onClick={() => {
            setOpen(!open);
          }}
        >
          <span>
            <span>
              <div className='down-arrow'>
                <span>
                  {item.icon && (
                    <FontAwesomeIcon icon={item.icon} className='mob-icon' />
                  )}
                  <span className='text-left'> {item.title}</span>
                </span>
                <span>
                  {' '}
                  <FontAwesomeIcon icon={faChevronDown} className='mob-icon' />
                </span>
              </div>
            </span>
          </span>
          <i
            className='bi-chevron-down toggle-btn'
          ></i>
        </div>
        <div className='sidebar-content'>
          {item.childrens.map((child, index) => (
            <div
              key={index}
              onClick={() => {
                if (child.title === 'Memory Test') {
                } else {
                  setShow(false);
                }
              }}
            >
              <SidebarItem key={index} item={child} setShow={setShow} />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className='sidebar-item plain'
        onClick={() => {
          setShow(false);
          router.push(item.path);
        }}
      >
        {item.icon && <FontAwesomeIcon icon={item.icon} lassName='mob-icon' />}
        {item.title === 'Formula' && userRole === 1 ? (
          <Link href={item.path} className='sidebar-item plain'>
            {item.title}
          </Link>
        ) : (
          item.title !== 'Formula' && (
            <Link href={item.path} className='sidebar-item plain'>
              {item.title}
            </Link>
          )
        )}
      </div>
    );
  }
}
