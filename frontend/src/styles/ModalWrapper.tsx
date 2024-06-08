import { Modal } from "antd";
import styled from "styled-components";

export const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    .ant-modal-header {
      .ant-modal-title {
        font-size: 24px;
        font-weight: 700;
        text-align: center;
      }
    }

    .ant-modal-body {
      margin: 32px 0;
      textarea {
        width: 100%;
        padding: 8px 16px;
        outline: none;
        border-radius: 8px;
        border-width: 1px;
        border-color: rgb(191 219 254);
        font-size: 16px;
      }
      ul {
        display: flex;
        justify-content: center;
        font-size: 40px;
        margin: 16px 0;

        li {
          margin-inline-end: 14px;
        }
      }
    }

    .ant-modal-footer {
      display: none;
    }
  }
`;

export const LogoutModalWrapper = styled(Modal)`
  .ant-modal-content {
    .ant-modal-header {
      .ant-modal-title {
        font-size: 24px;
        font-weight: 700;
        text-align: center;
      }
    }

    .ant-modal-body {
      margin: 32px 0;
      textarea {
        width: 100%;
        padding: 8px 16px;
        outline: none;
        border-radius: 8px;
        border-width: 1px;
        border-color: rgb(191 219 254);
        font-size: 16px;
      }
      ul {
        display: flex;
        justify-content: center;
        font-size: 40px;
        margin: 16px 0;

        li {
          margin-inline-end: 14px;
        }
      }
    }

    .ant-modal-footer {
      display: flex;
      column-gap: 32px;
      justify-content: center;

      button:first-child {
        background: red;
        width: 170px;
        color: white;
        font-size: 18px;
        font-weight: 700;
        height: 45px;
      }
      button:last-child {
        background: blue;
        width: 170px;
        font-size: 18px;
        font-weight: 700;
        height: 45px;
      }
    }
  }
`;
