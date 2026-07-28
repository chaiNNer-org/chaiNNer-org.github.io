/* eslint-disable react/display-name */
import { Box, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import { memo } from 'react';

interface SectionProps {
    id?: string;
    /**
     * The section's name, plainly. It is the heading — there is no separate
     * kicker above it, because a label on every section is grammar, not design.
     */
    heading: string;
    /** `h1` when the section titles the whole page, `h2` when it sits inside one. */
    as?: 'h1' | 'h2';
    /** Draws a hairline along the top edge. Off for the first section after the hero. */
    divider?: boolean;
    children: React.ReactNode;
}

/**
 * Every section is the same two columns: the name on the left, the substance on
 * the right. The heading sticks while its content scrolls, so you always know
 * which part of the page you are in.
 */
export const Section = memo(({ id, heading, as = 'h2', divider = true, children }: SectionProps) => {
    return (
        <Box
            as="section"
            id={id}
            w="100%"
            py={{ base: 14, md: 24 }}
            borderTop={divider ? '1px solid' : undefined}
            borderTopColor={divider ? 'line' : undefined}
            scrollMarginTop="6rem"
        >
            <Container maxW="1200px">
                <Grid
                    templateColumns={{ base: '1fr', lg: '15rem 1fr' }}
                    columnGap={16}
                    rowGap={{ base: 6, lg: 0 }}
                >
                    <GridItem>
                        <Heading
                            as={as}
                            fontSize={as === 'h1' ? { base: '1.75rem', md: '2rem' } : { base: '1.5rem', md: '1.75rem' }}
                            lineHeight="1.2"
                            position={{ lg: 'sticky' }}
                            top={{ lg: '7rem' }}
                        >
                            {heading}
                        </Heading>
                    </GridItem>
                    <GridItem minW={0}>{children}</GridItem>
                </Grid>
            </Container>
        </Box>
    );
});

/** Prose inside a section. Capped to a readable measure rather than the column width. */
export const Prose = memo(({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            maxW="38rem"
            fontSize={{ base: 'md', md: 'lg' }}
            color="inkMuted"
            lineHeight="1.7"
            sx={{ '& > p + p': { marginTop: '1.25em' } }}
        >
            {children}
        </Box>
    );
});
