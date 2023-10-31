import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/HomePage">HomePage</Link>
            </li>
            <li>
              <Link to="/Data">Product</Link>
            </li>
            <Link to="/cart">cart</Link>
          </ul>
        </nav>
        <Outlet />
        <div style={{ textAlign: "center" }}>
          <h1>Wellcome to home page</h1>
          <p>view product in store</p>
        </div>
      </>
    );
}
export default Layout;