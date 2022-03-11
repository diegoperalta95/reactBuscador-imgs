import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos ] = useState([])
  const open = url => window.open(url)
  const authKey = 'INSERT_UNSPLASH_KEY_HERE'

  useEffect(() => {
    document.title = "IMG Search"
  }, []);

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search:''}}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=28&query=${values.search}`, { 
              headers: {
                'Authorization': 'Client-ID '+authKey
              }
            })
            const data= await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search"/>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id} onClick={()=> open(photo.urls.full)}>
              <img src={photo.urls.regular}/>
              <p>{photo.description ? photo.description : photo.alt_description}</p>
              <p>&#128077; {photo.likes}</p>
            </article>)}
        </div>
      </div>
    </div>
  )
}

export default App;
