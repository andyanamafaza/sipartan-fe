import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Card } from 'react-bootstrap';
import React, { useContext } from 'react';
import { UserDataContext } from '../../App';

const ProfilePage = () => {

    const signOut = useSignOut();
    const { userData } = useContext(UserDataContext);

    return userData && (
        <>
            <style>
                {`body{background-color: #e5e5e5;}`}
            </style>
            <div className="py-5" style={{ height: "92vh" }}>
                <div className="container px-5 px-lg-0">
                    <Card className='w-100 shadow-lg border-0 mb-5'>
                        <Card.Header className='bg-primary'>
                            <div className="h2 m-0 text-center text-light"><strong>Data Pengguna</strong></div>
                        </Card.Header>
                        <Card.Body>
                            <div className="row mx-3 mx-lg-5 pb-5 p-lg-5 gx-5">
                                <div className="col-lg-1"></div>
                                <div className="col-lg-3 text-center">
                                    <i className='bi-person-circle' style={{ fontSize: "7.5rem" }}></i>
                                    <div className="h6"><strong>{userData.username}</strong></div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="row gy-2 mb-5">
                                        <div className="col-12">
                                            <label htmlFor="nama"><strong>Nama</strong></label>
                                            <input className="form-control border-2" id="nama" type="text" value={userData.nama} readOnly />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="instansi"><strong>Instansi Asal</strong></label>
                                            <input className="form-control border-2" id="instansi" type="text" value={userData.instansi} readOnly />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="email"><strong>Alamat E-mail</strong></label>
                                            <input className="form-control border-2" id="email" type="text" value={userData.email} readOnly />
                                        </div>
                                    </div>
                                    <div className="row gy-3">
                                        <div className="col-lg-8 d-grid">
                                            {/* <button type="button" className="btn btn-primary custom-btn-shadow">
                                                Ubah Kata Sandi
                                            </button> */}
                                        </div>
                                        <div className="col-lg-4 d-grid">
                                            <button type="button" className="btn btn-danger custom-btn-shadow" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                                <strong>Log Out</strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-1"></div>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="modal fade" id="logoutModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Log Out</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    Apakah anda yakin ingin keluar?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger custom-btn-shadow" data-bs-dismiss="modal" onClick={() => {
                                        signOut();
                                        window.location.reload();
                                    }}>Ya</button>
                                    <button type="button" className="btn btn-outline-secondary custom-btn-shadow" data-bs-dismiss="modal">
                                        Tidak
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;