import React from "react";

const BlogList = () => {
    const tablestyle = {
        borderCollapse: "collapse",
        width: "100%",
        border: "2px solid black"
    };
    const cellstyle = {
        border: "2px solid black",
        padding: "8px",
        textAlign: "center" 
    }
    return (
      <>
        <div>
          <table style={tablestyle}>
            <tr>
              <th style={cellstyle}>Product 1</th>
              <th style={cellstyle}>Product 2</th>
              <th style={cellstyle}>Product 3</th>
              <th style={cellstyle}>Product 4</th>
              <th style={cellstyle}>Product 5</th>
            </tr>
            <tr>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
            </tr>
            <tr>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
            </tr>
            <tr>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
              <td style={cellstyle}>Product</td>
            </tr>
          </table>
        </div>
      </>
    );
};

export default BlogList;
