/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Center, HStack, Image, Link, VStack } from '@chakra-ui/react';
import '../index.scss';
import { PageProps } from '../types';
import Banner from '../assets/banner.png';

function Page(pageProps: PageProps) {
    return (
        <Center h="100%">
            <VStack
                h="100%"
                spacing={8}
            >
                <Image
                    src={Banner}
                    w="738px"
                    maxW="90vw"
                    filter="drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))"
                    transition="all 0.3s ease"
                    _hover={{
                        transform: 'scale(1.02)',
                        filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4))',
                    }}
                />
                <HStack spacing={4}>
                    <Button
                        as={Link}
                        href="/download"
                        bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        color="white"
                        size="lg"
                        px={8}
                        py={6}
                        borderRadius="xl"
                        fontWeight="600"
                        fontSize="lg"
                        boxShadow="0 10px 25px -5px rgba(16, 185, 129, 0.4), 0 4px 6px -2px rgba(16, 185, 129, 0.1)"
                        transition="all 0.3s ease"
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: '0 20px 40px -5px rgba(16, 185, 129, 0.5), 0 8px 12px -2px rgba(16, 185, 129, 0.2)',
                            bg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        }}
                        _active={{
                            transform: 'translateY(0)',
                        }}
                    >
                        Download
                    </Button>
                    <Button
                        as={Link}
                        href="/nightly"
                        bg="rgba(30, 41, 59, 0.8)"
                        color="white"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.2)"
                        size="lg"
                        px={8}
                        py={6}
                        borderRadius="xl"
                        fontWeight="600"
                        fontSize="lg"
                        transition="all 0.3s ease"
                        _hover={{
                            bg: 'rgba(139, 92, 246, 0.1)',
                            borderColor: 'purple.400',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)',
                        }}
                        _active={{
                            transform: 'translateY(0)',
                        }}
                    >
                        Nightly
                    </Button>
                </HStack>
            </VStack>
        </Center>
    );
}

export { Page };
