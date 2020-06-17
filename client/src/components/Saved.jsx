import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Axios from 'axios';

export default class SaveComp extends React.Component {

    constructor() {
        super()
        this.state = {
            query: '',
            items: []

        };
    }

    componentDidMount() {
        this.getBooks()
    }


    getBooks() {

        Axios.get('http://localhost:5000/api/books').then(
            res => {
                console.log(res.data)
                this.setState({ items: res.data })
            },
            err => {
                console.log(err)
            }
        )
    }

    view = (link) => {
        window.open(link)
    }


    saveBook = (title, author, desc, img, link) => {
        let obj = {
            title: title,
            authors: author,
            description: desc,
            image: img.thumbnail,
            link: link
        }

        console.log(obj)
        Axios.post('http://localhost:5000/api/books', obj).then(
            res => {
                console.log(res)
            },
            err => {
                console.log(err)
            }
        )
    }

    delete = (id) => {

        Axios.delete(`http://localhost:5000/api/books/${id}`).then(
            res => {
                console.log(res.data)
                this.props.snack('Book Deleted','error')
                this.getBooks()
            },
            err => {
                console.log(err)
            }
        )
    }

    render() {
        return (
            <>
                <div>
                    {this.state.items ?
                        this.state.items.map((item, i) => {
                            let { title, image, link, authors, description, _id } = item
                            
                            return (
                                <Card style={{ margin: '15px 0' }}>
                                    {/* Cards are surfaces that display content and actions on a single topic.

They should be easy to scan for relevant and actionable information. Elements, like text and images, 
should be placed on them in a way that clearly indicates hierarchy. */}
                                    <CardContent>
                                    {/* Thanks to search on CSS tricks, I have used: The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
                                    The grid system is implemented with the Grid component: It uses CSS’s Flexible Box module for high flexibility.
                               There are two types of layout: containers and items.
                                Item widths are set in percentages, so they are always fluid and sized relative to their parent element.
                           Items have padding to create the spacing between individual items.
                              There are five grid breakpoints: xs, sm, md, lg, and xl. */}
                                        <Grid container spacing={3}>
                                            <Grid item xs={8}>
                                                <h3>{title}</h3>
                                                {authors ? <p>
                                                    Written By &ens;
                                                    {authors.map(name => {
                                                        return (
                                                            <span>{name},&ens;</span>
                                                        )
                                                    })}
                                                </p> : null}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="outlined" style={{ float: 'right' }} onClick={() => { this.view(link) }}>
                                                    View
                                        </Button>
                                                <Button variant="outlined"
                                                    style={{ float: 'right', marginRight: '20px' }}
                                                    onClick={() => { this.delete(_id) }}>
                                                    Delete
                                        </Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <img
                                                    src={image !== undefined ? image : ''}
                                                    alt="book"
                                                    className="bookImage"
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <p style={{ marginTop: '0' }}>{description}</p>
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Card>

                            );
                        })
                        : null
                    }</div>
            </>
        )
    }
}