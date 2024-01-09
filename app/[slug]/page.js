import { getPostData, postDataSorter } from "../../helpers/api-utils";

export default async function TestPage () {

    const stuff = await getPostData('test')
    const stufff = postDataSorter(stuff)
    console.log(stufff)


    return (
        <div>
            <h1>test Page</h1>
            {stufff[32].title}
        </div>
    )

}