import { WhiteLoadingSVG } from "assets/svgs";
import React from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const Button = ({
  type,
  className,
  children,
  disabled,
  onClick,
  id,
  ref,
  border,
  itemClassName,
  pending,
}: {
  type?: string;
  className?: string;
  children?: any;
  disabled?: boolean;
  onClick?: any;
  id?: string;
  ref?: any;
  border?: string;
  itemClassName?: string;
  pending?: boolean;
}) => {
  const LoadingSpinner = () => {
    return (
      <div className="absolute right-2">
        <Oval
          width={20}
          height={20}
          color={"white"}
          secondaryColor="black"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  };
  return (
    <>
      {type === "primary" ? (
        <PrimaryButton
          className={className}
          disabled={disabled}
          onClick={onClick}
          id={id}
          ref={ref}
          border={border}
        >
          <div
            className={`${itemClassName} h-full rounded-lg whitespace-nowrap transition flex justify-center items-center`}
          >
            {pending ? <div className="mr-1">{WhiteLoadingSVG}</div> : ""}
            {children}
          </div>
        </PrimaryButton>
      ) : type === "secondary" ? (
        <SecondaryButton
          className={className}
          disabled={disabled}
          onClick={onClick}
          id={id}
          ref={ref}
        >
          <div className="w-full h-full p-3 rounded-lg flex justify-center items-center">
            {pending ? <div className="mr-1">{WhiteLoadingSVG}</div> : ""}
            {children}
          </div>
        </SecondaryButton>
      ) : type === "category" ? (
        <CategoryButton
          className={className}
          disabled={disabled}
          onClick={onClick}
          id={id}
          ref={ref}
        >
          {pending ? <div className="mr-1">{WhiteLoadingSVG}</div> : ""}
          {children}
        </CategoryButton>
      ) : type === "smallConnect" ? (
        <SmallConnectButton
          className={className}
          disabled={disabled}
          onClick={onClick}
          id={id}
          ref={ref}
          border={border}
        >
          <div
            className={`${itemClassName} rounded-lg whitespace-nowrap transition flex`}
          >
            {pending ? <div className="mr-1">{WhiteLoadingSVG}</div> : ""}
            {children}
          </div>
        </SmallConnectButton>
      ) : (
        ""
      )}
    </>
  );
};

const BaseButton = styled.button`
  font-size: 16px;
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  :disabled {
    cursor: not-allowed;
  }
  color: white;
  line-height: 1.2;
  letter-spacing: 0.9px;
`;

const PrimaryButton = styled(BaseButton)<{ border?: string }>`
  /* code */
  position: relative;
  background: linear-gradient(130deg, #4fc0ff 0%, #c23fff 100%),
    linear-gradient(130deg, #4fc0ff 0%, #c23fff 100%);
  background-position: 8px 0, 8px 100%;
  background-repeat: no-repeat;
  background-size: calc(100% - 8px - 8px) ${({ border }) => border};
  border-radius: 8px;
  border: none;

  ::before,
  ::after {
    content: "";
    display: block;
    position: absolute;
    width: 8px;
    top: 0;
    bottom: 0;
  }

  ::before {
    left: ${({ border }) => border};
    border: ${({ border }) => border} solid #4fc0ff;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right-color: transparent;
  }

  ::after {
    right: ${({ border }) => border};
    border: ${({ border }) => border} solid #c23fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-left-color: transparent;
  }
  :hover:not([disabled]) {
    > div:nth-child(1) {
      box-shadow: 0px 2px 4px #ffffff40;
    }
  }

  /* bg */
`;

const SecondaryButton = styled(BaseButton)`
  :not([disabled]) > div:nth-child(1) {
    transition: all 0.3s;
    background: linear-gradient(130deg, #4fc0ff, #c23fff, #c23fff, #c23fff);
    background-size: 300% 100%;
    :hover {
      background-position: 100% 0;
    }
  }
  > div:nth-child(1) {
    transition: all 0.3s;
    background: linear-gradient(130deg, #4fc0ff, #c23fff, #c23fff, #c23fff);
    background-size: 300% 100%;
  }

  transition: none;
  :hover:not([disabled]) {
    box-shadow: 0px 2px 4px #ffffff40;
  }
`;

const CategoryButton = styled(BaseButton)`
  border: 1px solid white;
  padding: 12px;
  border-radius: 12px;
  background: #ffffff1a;
  transition: 0.15s all;
  :hover:not([disabled]) {
    box-shadow: 0px 2px 6px #ffffffa4;
  }
`;

const SmallConnectButton = styled.button<{ border?: string }>`
  margin: auto 0;
  font-size: 12px;
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  :disabled {
    cursor: not-allowed;
  }
  height: 37px;
  color: white;
  line-height: 1.2;
  letter-spacing: 0.9px;
  position: relative;
  background: linear-gradient(130deg, #4fc0ff 0%, #c23fff 100%),
    linear-gradient(130deg, #4fc0ff 0%, #c23fff 100%);
  background-position: 8px 0, 8px 100%;
  background-repeat: no-repeat;
  background-size: calc(100% - 8px - 8px) ${({ border }) => border};
  border-radius: 8px;
  border: none;

  ::before,
  ::after {
    content: "";
    display: block;
    position: absolute;
    width: 8px;
    top: 0;
    bottom: 0;
  }

  ::before {
    left: ${({ border }) => border};
    border: ${({ border }) => border} solid #4fc0ff;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right-color: transparent;
  }

  ::after {
    right: ${({ border }) => border};
    border: ${({ border }) => border} solid #c23fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-left-color: transparent;
  }

  /* bg */
`;

export default Button;
