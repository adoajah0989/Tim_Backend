import React from "react";
import "../css/style.css";

const sevenBox = () => {
  return (
    <box>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className="d-flex col rounded-3 m-5">
        <div id="kolom-kiri" className=" shadow-lg column">
          {/* Kolom Kiri */}
          <p>TEST KOLOM KIRI</p>
        </div>
        <div id="kolom" className="column is-one-two">
          <div className="container">
            <div className="row">
              {/* Kotak 1 */}
              <div className="col-md-4">
                <a
                  href="/tamu"
                  className="button box m-auto larger-box icon-square text-link"
                >
                  <img
                    width="100"
                    height="100"
                    src="https://img.icons8.com/sf-regular/100/user-group-man-man.png"
                    alt="user-group-man-man"
                  />
                  <p className="text-inside-box">Tamu</p>
                </a>
              </div>

              {/* Kotak 2 */}
              <div className="col-md-4">
                <a
                  href="/patroli"
                  className="button box m-auto larger-box icon-square text-link"
                >
                  <img
                    className="p-2"
                    width="100"
                    height="100"
                    src="https://img.icons8.com/material-outlined/100/refresh--v1.png"
                    alt="refresh--v1"
                  />
                  <p className="text-inside-box">In Out</p>
                </a>
              </div>

              {/* Kotak 3 */}
              <div className="col-md-4">
                <a
                  href="/mutasi"
                  className="button box m-auto larger-box icon-square text-link"
                >
                  <img
                    width="100"
                    height="100"
                    src="https://img.icons8.com/material-outlined/100/data-in-both-directions.png"
                    alt="data-in-both-directions"
                  />
                  <p className="text-inside-box">Mutasi</p>
                </a>
              </div>

              {/* Kotak 4 */}
              <div className="col-md-4">
                <a
                  href="/formpatrol"
                  className="button box m-auto larger-box icon-square text-link"
                >
                  <img width="100" height="100" src="https://img.icons8.com/windows/100/policeman-male--v1.png" alt="policeman-male--v1"/>
                  <p className="text-inside-box">Patrol</p>
                </a>
              </div>

              {/* Kotak 5 */}
              <div className="col-md-4">
                <a className="button box m-auto larger-box icon-square text-link">
                <img width="100" height="100" src="https://img.icons8.com/ios/100/health-graph.png" alt="health-graph"/>
                  <p className="text-inside-box">Lapdi</p>
                </a>
              </div>

              {/* Kotak 6 */}
              <div className="col-md-4">
                <a className="button box m-auto larger-box icon-square text-link">
                <img width="100" height="100" src="https://img.icons8.com/ios/100/task.png" alt="task"/>
                  <p className="text-inside-box">B.A.P</p>
                </a>
              </div>
              <div className="col-md-4">
                <a
                  href="/ASSET"
                  className="button box m-auto larger-box icon-square text-link"
                >
                <img width="100" height="100" src="https://img.icons8.com/material-outlined/100/delivery.png" alt="delivery"/>


                  <p className="text-inside-box">B.Expedisi</p>
                </a>
              </div>

              {/* Kotak 5 */}
              <div className="col-md-4">
                <a className="button box m-auto larger-box icon-square text-link">
                <img width="100" height="100" src="https://img.icons8.com/material-outlined/100/company-assets-.png" alt="company-assets-"/>
                  <p className="text-inside-box">Asset</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </box>
  );
};

export default sevenBox;
