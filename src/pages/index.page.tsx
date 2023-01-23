/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Center, Flex, HStack, Image, Spacer, VStack } from '@chakra-ui/react';
import '../App.scss';
import { PageProps } from '../types';
import Banner from '../assets/banner.png';

function Page(pageProps: PageProps) {
    return (
        <Center h="100%">
            <VStack h="100%">
                <Image
                    src={Banner}
                    w="738px"
                />
                <HStack>
                    <Button>Download</Button>
                </HStack>
            </VStack>
        </Center>
    );
}

export { Page };
