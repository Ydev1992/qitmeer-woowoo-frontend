import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./menu.css";
import styled from "styled-components";
import ConnectButton from "../ConnectButton";
import Button from "components/Button";
import { useTranslation } from "react-i18next";
import { LangSVG } from "assets/svgs";
import SearchInput from "components/SearchInput";

const Hamburger = ({ criteria, setCriteria }: { criteria: string; setCriteria: any }) => {
  const menuRef: any = useRef(null);
  const { t } = useTranslation();

  function onClose() {
    const form: any = document.getElementById("check");
    if (form) form.checked = false;
  }

  useEffect(() => {
    document.addEventListener("mouseup", function (event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    });
  }, []);

  const menus = ["Marketplace"];

  return (
    <nav role="navigation" className="lg:hidden block">
      <div id="menuToggle" ref={menuRef}>
        {/* A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it. */}

        <input type="checkbox" id="check" />

        {/* Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff. */}

        <span></span>
        <span></span>
        <span></span>

        {/* Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic. */}

        <Menu id="menu" className=" backdrop-blur">
          <div className="xs:px-12 px-3 mt-[100px]">
            <Menus className="flex flex-col font-[900] w-full mt-[50px] !mb-6">
              {menus.map((data, i) => {
                return (
                  <Link
                    to={`/${data.replace(" ", "").toLowerCase()}`}
                    className="text-3xl leading-[2.2] text-white"
                    key={i}
                    onClick={() => onClose()}
                  >
                    {data}
                  </Link>
                );
              })}
            </Menus>
            <SearchInput
              criteria={criteria}
              setCriteria={setCriteria}
              placeholder={"Search NFTs,Collections,Creators or more"}
              className="w-full z-10"
            />
            <div className="w-full mt-6 ">
              {/* <div className="w-full flex justify-center mb-4 cursor-pointer">{LangSVG}</div> */}
              <ConnectButton fullWidth={true} />
            </div>
          </div>
        </Menu>
      </div>
    </nav>
  );
};

const Menus = styled.div`
  > a {
    transition: all 0.3s !important;
    :hover {
      margin-left: 10px;
      color: #b6fdff !important;
    }
  }
  @media screen and (max-height: 960px) {
    margin: 0;
  }
`;

const Menu = styled.ul`
  position: relative;
  overflow: hidden;
`;

export default Hamburger;
