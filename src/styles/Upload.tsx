import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FormLabel = styled.label`
  font-size: 28px;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 20px;
`;

export const FormInput = styled.input`
  padding: 8px;
  font-size: 20px;
  width: 100%;
`;

export const FormDropZone = styled.div`
  cursor: pointer;
  width: 100%;
  line-height: 100px;
  text-align: center;
  background-color: gray;
`;

export const FormImage = styled.img`
  width: 70%;
`;
