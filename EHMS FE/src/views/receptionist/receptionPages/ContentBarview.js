import "../../../styels/receptionStyle.css";
import FormTable from './FormTableview';
import SearchBar from './SearchBar';



const ContentBarview = () => {
    
    return (

        <section id="contentBar" className="col-sm-10 overflow-auto" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/wall_02.jpg'})`,
            backgroundRepeat: 'no-repeat'
        }}>

            <div className="container-fluid" id="tableList">
                <div className="row">
                    <div className="col-sm-6">
                        { <SearchBar /> }
                    </div>
                    

                </div>
                <FormTable />
            </div>
        </section>
    )

}
export default ContentBarview;