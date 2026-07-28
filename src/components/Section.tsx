/* eslint-disable react/display-name */
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';

interface SectionProps {
    id?: string;
    eyebrow: string;
    heading: string;
    lede?: React.ReactNode;
    maxW?: string;
    /** Draws a hairline rule along the top edge. Off for the first section after the hero. */
    divider?: boolean;
    children?: React.ReactNode;
}

export const Section = memo(({ id, eyebrow, heading, lede, maxW = '1200px', divider = true, children }: SectionProps) => {
    return (
        <Box
            as="section"
            id={id}
            w="100%"
            py={{ base: 16, md: 20 }}
            borderTop={divider ? '1px solid' : undefined}
            borderTopColor={divider ? 'whiteAlpha.100' : undefined}
            scrollMarginTop="4.5rem"
        >
            <Container maxW={maxW}>
                <VStack
                    align="start"
                    spacing={4}
                >
                    <Text
                        fontFamily="mono"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="0.15em"
                        color="brand.300"
                    >
                        {eyebrow}
                    </Text>
                    <Heading
                        as="h2"
                        size="xl"
                        color="white"
                        maxW="44rem"
                        lineHeight="1.2"
                    >
                        {heading}
                    </Heading>
                    {lede != null && (
                        <Box
                            maxW="44rem"
                            pt={2}
                        >
                            {lede}
                        </Box>
                    )}
                </VStack>
                {children != null && <Box mt={10}>{children}</Box>}
            </Container>
        </Box>
    );
});
