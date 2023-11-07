import React from "react";
import { Link } from "react-router-dom";
import { Box, Image, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import StarsRating from "./Star";

export default function TalentCard({
  title,
  username,
  description,
  image,
  cost,
  id,
  category,
  rating,
  reviews,
}) {
  return (
    <div className=" w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4   rounded-sm">
      <Box
        m="2"
        w="440px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        h="570px"
        p="6"
      >
        <Image src={image} alt="talent_image" h="250px" w="420px" />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {/* <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge> */}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              ml="2"
            >
              <p className=" font-semibold text-2xl mb-1">By: {username}</p>

              <p className="text-1xl font-semibold py-1">
                Categoria: {category}
              </p>
            </Box>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <p className=" font-semibold text-1xl py-1 underline">{title}</p>
          </Box>

          <Box overflowY="auto" maxH="100px">
            <span className=" font-normal "> {description}</span>
          </Box>

          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
              <p className=" font-bold mt-1">${cost}</p>
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            <StarsRating rating={rating} />
            {reviews?.map((e, index) => {
              return <p key={index}>{e.description}</p>;
            })}
          </Box>
          <div className="ml-2  transform ease-out duration-300 transition-transform hover:underline">
            <Link to={"/talent/" + id}>
              <Button>Ver mas</Button>
            </Link>
          </div>
        </Box>
      </Box>
    </div>
  );
}
