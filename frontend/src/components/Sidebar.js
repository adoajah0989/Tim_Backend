import React from 'react';


export const Sidebar = () =>{
    return (
    <aside className="menu mt-1 pl-2 has-shadow">
        <ul className="menu">
            <li><a href={"/dashboard"}>Dashboard</a></li>
            <li><a href={"/tamu"}>Tamu</a></li>
        </ul>
        <ul className="menu-list">
    <li>
      <a className="is-active">Patroli</a>
      <ul>
        <li><a>Form Patroli</a></li>
        <li><a>Buku Mutasi</a></li>
      </ul>
    </li>
  </ul>
        {/* <p class="menu-label">
            Transactions
        </p> */}
        <ul className="menu-list">
        <li><a href={"/dashboard"}>Asset</a></li>
        <li><a href={"/dashboard"}>Mutasi</a></li>
        <li><a href={"/dashboard"}>LKM</a></li>
        <li><a href={"/dashboard"}>BAP</a></li>
        <li><a href={"/dashboard"}>DARURAT</a></li>
        </ul>
</aside>
  )
}

  export default Sidebar