import { Configuration, OpenAIApi } from 'openai'

export default defineEventHandler(async (event) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const body = await readBody(event)

  const userInput = body.userInput || ''

  if (userInput.trim('').length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter some text, such as: name, age, hobby, etc.',
    })
  }

  function generatePrompt(userInput: string) {
    return `Create a birthday wish for a person.
  
  Person: Marty McFly 17 high school student time travel guitar nike
  Birthday Wish: Happy Birthday, Marty McFly! Wishing you a day filled with joy, laughter, and all the good things life offers. May you have a great year ahead full of exciting adventures, fun times with friends, and success in all your endeavors. May you also have the best of luck in your time travels
  Person: Marie, 30, a scientist, loves chemistry, plays Dota 2
  Birthday Wish: Happy 30th Birthday, Marie! Wishing you a day filled with joy and happiness. May all your dreams come true and may you continue to excel in your scientific pursuits. Here's to another year of discovering the wonders of chemistry and playing Dota 2!
  Person: ${userInput}
  Birthday Wish:`
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(userInput),
      max_tokens: 1000,
      temperature: 0.6,
    })

    return { result: completion.data.choices[0].text }
  }
  catch (error) {
    if (error.response) {
      throw createError({
        statusCode: error.response.status,
        statusMessage: error.response.data,
      })
    }
    else {
      throw createError({
        statusCode: 500,
        statusMessage: 'An error occurred during your request.',
      })
    }
  }
})
