import Header from 'components/Layout/Header/Header';
const Layout = ({ children }: childrenType) => {
  return (
    <>
      <div className={`main-container`}>
        <div className=''>
          <Header />
        </div>
        <div className='layout-style'>
          <div
            className='layout-content'
            style={{
              flexGrow: '1',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
