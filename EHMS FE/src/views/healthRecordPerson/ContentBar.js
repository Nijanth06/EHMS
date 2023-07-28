import './content.css';
import PatientRegister from "./receptionPages/PatientRegister";
import FormTable from "./receptionPages/FormTable";

const ContentBar = () => {
    
    return (
        
        <section id="contentBar" className="col-sm-12 overflow-auto" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/wall_02.jpg'})`,
            backgroundRepeat: 'no-repeat'
        }}>

            <div className="container-fluid" id="tableList">
                <div className="row">
                    <div className="col-sm-12 modelBtn">
                        {/* Button trigger modal */}
                        <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter">
                            <b><i class="fa-sharp fa-solid fa-plus"></i> Add Patient</b>
                        </button>

                        {/* Modal */}
                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content" id="modelBack">
                                    <div className="row m-0 p-0">
                                        <div className="col-11 p-3 text-center">
                                            <h4 className="modal-title" id="exampleModalLongTitle">Patient Registration <i className="fa-solid fa-user-plus"></i></h4>
                                        </div>
                                        <div className="col-1 p-1 text-right">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true" className='text-danger'><i className="fa-solid fa-circle-xmark"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="modal-body mx-auto w-75 bg-light" style={{borderColor:"black", borderStyle:"solid",}}>
                                        <PatientRegister />
                                    </div>
                                    <div className="row w-100 p-3 m-0">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <FormTable />
            </div>
        </section>
    )

}
export default ContentBar;