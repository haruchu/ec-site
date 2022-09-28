import styled from 'styled-components';
import { phone } from '../valiables/BreakPoint';

export const Wrapper = styled.form`
  height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  ${phone`
  gap: 30px;
  `}
  background-color: #e8d7f4;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  ${phone`
    gap: 20px;
  `}
`;

export const FormLabel = styled.label`
  font-weight: 700;
  font-size: 28px;
  z-index: 2;
  ${phone`
    font-size:18px;
  `}
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 24px;
  ${phone`
    font-size:16px;
  `}
  border: none;
  border-radius: 12px;
  background: #e8d7f4;
  box-shadow: inset 8px 8px 16px #ccbdd7, inset -8px -8px 16px #fff1ff;

  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  &::before {
    content: '注）';
  }
`;

export const FormDropZone = styled.div`
  cursor: pointer;
  width: 300px;
  height: 200px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #e8d7f4;
  box-shadow: inset 31px 31px 61px #dacae5, inset -31px -31px 61px #f6e4ff;
  z-index: 2;
`;

export const FormImage = styled.img`
  width: 300px;
  height: 200px;
`;

export const SubmitButton = styled.button`
  cursor: pointer;
  ${phone`
    width: fit-content;
  `}
  padding: 20px 40px;
  outline: none;
  border: none;
  border-radius: 50px;
  background: linear-gradient(145deg, #f8e6ff, #d1c2dc);
  box-shadow: 8px 8px 16px #ccbdd7, -8px -8px 16px #fff1ff;
`;
