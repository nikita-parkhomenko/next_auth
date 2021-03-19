
// outsource dependencies
import {useState} from 'react';
import Image from 'next/image';
import {gql} from '@apollo/client';
import {client} from '../../apollo-client';
import {
    Container,
    Badge,
    Row,
    Form,
    FormGroup,
    Input,
    Button,
    Alert,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle, CardText, CardLink
} from 'reactstrap';

import Layout from '../../components/layout';

export default function Home(props) {
    const [characters, setCharacters] = useState([...props.characters]);
    const [searchCharacter, setSearchCharacter] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const onDismiss = () => setErrorMessage(null);

    const handleSubmit = async event => {
        event.preventDefault();
        const result = await fetch("/api/searchCharacter", {
            method: "post",
            body: searchCharacter,
        });
        const { characters, error } = await result.json();
        if (error) {
            setErrorMessage(error)
        } else {
            setCharacters(characters)
        }
    }
    return (
        <Layout>
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <h1><Badge color="warning">Rick and Morty</Badge></h1>
                {errorMessage
                    ? <Alert className="ml-auto" color="danger" toggle={onDismiss}>
                        {errorMessage}
                    </Alert>
                    : null
                }
                <hr className="w-100" />
                <Form className="mb-3" onSubmit={handleSubmit}>
                    <FormGroup className="d-flex justify-content-center">
                        <Input
                            type="text"
                            name="name"
                            placeholder="...name"
                            value={searchCharacter}
                            onChange={event => setSearchCharacter(event.target.value)}
                        />
                        <Button
                            color="warning"
                            className="ml-2"
                            disabled={searchCharacter === ''}
                        >
                            Search
                        </Button>
                        <Button
                            color="danger"
                            className="ml-2"
                            disabled={!searchCharacter.length}
                            onClick={() => {
                                setSearchCharacter('');
                                setCharacters(props.characters)
                            }
                            }
                        >
                            Reset
                        </Button>
                    </FormGroup>
                </Form>
                <Row className="d-flex justify-content-around w-100">
                    {characters.map(character => (
                        <Col xs="12" md="6" lg="4" key={character.id}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h5">{character.name}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Origin: {character.origin.name}</CardSubtitle>
                                </CardBody>
                                <Image src={character.image} alt="Character image" width={300} height={300}/>
                                <CardBody>
                                    <CardText>Location: {character.location.name}</CardText>
                                    <CardLink href="#">Card Link</CardLink>
                                    <CardLink href="#">Another Link</CardLink>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </Layout>
    )
}

export async function getStaticProps() {
    const { data } = await client.query({
        query: gql`
      query{
        characters(page: 1){
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

    return {
        props: {
            characters: data.characters.results,
        }
    }
}
