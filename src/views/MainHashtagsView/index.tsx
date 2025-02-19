import { Box, Stack } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import {
  AnimatedBox,
  Container,
  Hero,
  Layout,
  Markdown,
  Slider,
  SliderHero,
} from '@components'

interface MainHashtagsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
  seo: NextSeoProps
  link: string
}

const MainHashtagsView = ({
  source,
  pageData,
  seo,
}: MainHashtagsProps): JSX.Element => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        title={pageData.title}
        isFullHeight={false}
        image={pageData.image}
      />
      <Container>
        {source && (
          <Box
            my={4}
            fontSize="md"
            maxW="container.md"
            mx="auto"
            textAlign="center"
          >
            <Markdown source={source} />
          </Box>
        )}

        <Stack spacing={16}>
          {pageData.hashtags?.map((hashtag, i) => (
            <AnimatedBox
              directing={i % 2 === 0 ? 'to-left' : 'to-right'}
              delay={5}
              key={i}
            >
              <Box px={8} pt={8} pb={4} bg="white" shadow="lg">
                <SliderHero item={hashtag} />
                <Slider
                  slides={{ base: 1, md: 2, lg: 3 }}
                  posts={hashtag.posts?.map(post => ({
                    ...post,
                    hashtag: { ...hashtag, page: pageData },
                  }))}
                  loop
                  hasSocialCard
                  customStyles={{ opacity: 0.5 }}
                  activeStyles={{ opacity: 1 }}
                  hasLink
                />
              </Box>
            </AnimatedBox>
          ))}
        </Stack>
      </Container>
    </Layout>
  )
}

export default MainHashtagsView
