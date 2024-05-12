import classes from '../styles.module.scss';

import { useState } from 'react';

async function getData(article) {
    const res = await fetch('https://en.wikipedia.org/w/api.php?action=parse&page=' + article + '&format=json')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

  const GenerateFromWiki = () => {

    const [articleName, setArticleName] = useState('');
    const [article, setArticle] = useState('');

    const onFormSubmit = (e) => {
        e.preventDefault();
        setArticleName(articleName);
    }

    const onChange = (e) => {
        setArticleName(e.target.value)
    }
   
    return (
        <div className={classes.pageContainer}>
            <form>
                <label for="article-name">Wikipedia article:</label>
                <input type="text" id="article-name" name="article-name" onChange={onChange} value={articleName}></input>
                <button type="submit" onClick={onFormSubmit}>show</button>
            </form>
        </div>
        )
  }

export default GenerateFromWiki;