import React from "react";
import { Link } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";
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
        overflowY="auto"
        overflowX="hidden"
        h="570px"
        p="6"
      >
        <Image
          src={image}
          alt="talent_image"
          h="220px"
          w="410px"
          padding="5px"
          marginLeft="6px"
        />

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
          <p className=" font-semibold text-1xl py-1 underline">{title}</p>

          <span className=" block h-[90px] w-fit overflow-y-auto font-normal ">
            {description}
          </span>

          <Box>
            <p className=" font-bold mt-1">${cost}</p>
          </Box>
          <StarsRating rating={rating} />

          {reviews?.map((e, index) => {
            return (
              <p className="text-sm font-light px-1 w-fit" key={index}>
                {e.description}
              </p>
            );
          })}
          <div className="mt-1 w-fit">
            <Link to={"/talent/" + id}>
              <button className="ml-2  transform ease-out duration-300 transition-transform hover:underline">
                Ver mas
              </button>
            </Link>
          </div>
        </Box>
      </Box>
    </div>
  );
}
