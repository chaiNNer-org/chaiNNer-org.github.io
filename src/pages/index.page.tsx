/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Center, HStack, Image, Link, VStack } from '@chakra-ui/react';
import '../index.scss';
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
                    <Button
                        as={Link}
                        href="/download"
                    >
                        Download
                    </Button>
                </HStack>
            </VStack>
        </Center>
    );
}

export { Page };
