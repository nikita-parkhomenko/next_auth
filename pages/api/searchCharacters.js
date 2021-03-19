import {gql} from '@apollo/client';
import {client} from '../../apollo-client';

export default async (req, res) => {
    const search = req.body;
    try {
        const { data } = await client.query({
            query: gql`
        query{
          characters(filter: { name: "${search}" }){
            info{
              count
              pages
            }
            results{
              name
              id
              location{
                id
                name
              }
              origin{
                id
                name
              }
              image
            }
          }
        }
      `
        });

        res.status(200).json({
            characters: data.characters.results,
            error: null
        });

    } catch(error) {
        console.log(error);
        if (error.message === '404: Not Found') {
            res.status(400).json({
                characters: null,
                error: 'No Characters Found'
            })
        } else {
            res.status(500).json({
                characters: null,
                error: 'Internet Error, please try again'
            })
        }
    }
}