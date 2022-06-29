import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '8vabs8ba',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skpKqN14QvSGVK9YwSYh7t7oaNU8CZTPldr1A3C90sCN7EVc8E6jpVjf91agBeAJ2lleeVBp37k9vxJmxslr1WXhd6PLCb3ixiI1OvLatihEKKt0mSK4jFv9qoV0S4N0HPoZq9wrqskDKvYzFzpe1dkx2wfsEEBcj0VdjbSlsz1rk6S1bcOH',
  useCdn: false,
})
