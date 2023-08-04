import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { clearItemsCart } from "../../actions/shoppingActions";
import { useDispatch } from "react-redux";

export default function CheckoutMP() {

  const [modalIsOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearItemsCart())
  }, [dispatch])


  return (
    <ReactModal
      isOpen={modalIsOpen}
      contentLabel="Example Modal"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40"
      className="absolute m-auto max-w-max inset-x-0 top-40  rounded-lg"
    >
        <Alert
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Muchas gracias por tu compra!
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            Vuelve al sitio para el siguiente paso, contacta con tu docente digital accediendo al chat desde su perfil.
          </AlertDescription>
        <Link
          to="/home"
          className="bg-semidark font-bold self-center text-xl border-2 w-40 rounded-lg m-2 hover:bg-light hover:border-black"
        >
          Entendido
        </Link>
        </Alert>
      {/* </div> */}
    </ReactModal>
  );
}
