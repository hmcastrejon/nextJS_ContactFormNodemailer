import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Tooltip } from '@chakra-ui/react'
import { useState } from "react";
import { sendContactForm } from "../lib/api";

const placeHolders = { name: "Ex: Jhon", lastname: "Ex: Doe", email: "Ex: jhondoe@email.com", phone: "650-253-0000", message: "Enter text here", type: "Ex: Villa", bedrooms: "Ex: 2" };
const initValues = { name: "", lastname: "", email: "", phone: "", message: "", type: "", bedrooms: "" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <Container maxW="450px" mt={12}>
      <Heading>Contact</Heading>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
          <FormLabel>First Name</FormLabel>
          <Tooltip label={placeHolders.name}>
            <Input
              type="text"
              name="name"
              errorBorderColor="red.300"
              value={values.name}
              onChange={handleChange}
              onBlur={onBlur}
              autoComplete="given-name"
            />
          </Tooltip>
          <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={touched.lastname && !values.lastname} mb={5}>
        <FormLabel>Last Name</FormLabel>
          <Tooltip label={placeHolders.lastname}>
            <Input
              type="text"
              name="lastname"
              errorBorderColor="red.300"
              value={values.lastname}
              onChange={handleChange}
              onBlur={onBlur}
              autoComplete="family-name"
            />
          </Tooltip>
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={touched.email && !values.email} mb={5}>
        <FormLabel>Email</FormLabel>
          <Tooltip label={placeHolders.email}>
            <Input
              type="text"
              name="email"
              errorBorderColor="red.300"
              value={values.email}
              onChange={handleChange}
              onBlur={onBlur}
              autoComplete="email"
            /> 
          </Tooltip>
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>


      <FormControl isRequired isInvalid={touched.phone && !values.phone} mb={5}>
        <FormLabel>Phone Number</FormLabel>
          <Tooltip label={placeHolders.phone}>
            <Input
              type="text"
              name="phone"
              errorBorderColor="red.300"
              value={values.phone}
              onChange={handleChange}
              onBlur={onBlur}
              autoComplete="tel"
            /> 
          </Tooltip>
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl 
      isRequired isInvalid={touched.type && !values.type} mb={5}>
        <FormLabel>What Type of Property are you looking for?</FormLabel>
        <Select 
        placeholder='Select an option' 
        type="select" 
        name="type"
        errorBorderColor="red.300"
        value={values.type}
        onChange={handleChange}
        onBlur={onBlur}
        >
          <option selected>Condominium</option>
          <option>Villa</option>
        </Select>
      </FormControl>

      <FormControl 
      isRequired isInvalid={touched.bedrooms && !values.bedrooms} mb={5}>
        <FormLabel>What is your preferred number of bedrooms?</FormLabel>
        <Select 
        placeholder='Select an option' 
        type="select" 
        name="bedrooms"
        errorBorderColor="red.300"
        value={values.bedrooms}
        onChange={handleChange}
        onBlur={onBlur}
        autoComplete="off"
        >
          <option selected>2</option>
          <option>3</option>
          <option>4</option>
        </Select>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={touched.message && !values.message}
        mb={5}
      >
        <FormLabel>Message</FormLabel>
        <Textarea
          type="text"
          name="message"
          rows={4}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
          autoComplete="off"
          defaultValue={1} 
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <Button
        variant="outline"
        colorScheme="blue"
        isLoading={isLoading}
        disabled={
          !values.name || !values.lastname || !values.email || !values.phone || !values.message
        }
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}
