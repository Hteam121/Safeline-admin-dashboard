// src/components/Contact.js
import React from 'react';
import AnimationWrapper from './AnimationWrapper';
import styled from 'styled-components';

const ContactContainer = styled.div`
  padding: 20px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

const Label = styled.label`
  margin-bottom: 15px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-top: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #ffa500;
    color: #000000;
  }
`;

const Contact = () => (
  <AnimationWrapper>
    <ContactContainer>
      <h1>Contact Us</h1>
      <ContactForm>
        <Label>
          Name
          <Input type="text" placeholder="Your Name" />
        </Label>
        <Label>
          Email
          <Input type="email" placeholder="Your Email" />
        </Label>
        <Label>
          Message
          <Textarea placeholder="Your Message" rows="5" />
        </Label>
        <Button type="submit">Send Message</Button>
      </ContactForm>
    </ContactContainer>
  </AnimationWrapper>
);

export default Contact;
