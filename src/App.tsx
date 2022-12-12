import { useState } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  Form,
  Label,
  Input,
  FormText,
  Button,
  Table,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { IMahasiswa } from "./interface/mahasiswa";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const joivalidator: Joi.ObjectSchema<IMahasiswa> = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  gender: Joi.string().required(),
  dob: Joi.string().required(),
  photo: Joi.any().required(),
  cv: Joi.any().required(),
  certificate: Joi.any().required(),
}).unknown(true);

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMahasiswa>({
    resolver: joiResolver(joivalidator),
  });

  const [mahasiswas, setMahasiswas] = useState<IMahasiswa[]>([]);

  const { ref: refName, ...restName } = register("name", { required: true });
  const { ref: refAddress, ...restAddress } = register("address", {
    required: true,
  });
  const { ref: refGender, ...restGender } = register("gender", {
    required: true,
  });
  const { ref: refDob, ...restDob } = register("dob", {
    required: true,
  });
  const { ref: refPhoto, ...restPhoto } = register("photo", {
    required: true,
  });
  const { ref: refCv, ...restCv } = register("cv", {
    required: true,
  });
  const { ref: refCertificate, ...restCertificate } = register("certificate", {
    required: true,
  });

  const onSubmit = (data: IMahasiswa) => {
    let photo = (data.photo as any)[0] as File;
    let cv = (data.cv as any)[0] as File;
    let certificate = (data.cv as any)[0] as File;
    setMahasiswas([
      ...mahasiswas,
      {
        ...data,
        photo,
        cv,
        certificate,
      },
    ]);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <h1>Form Input</h1>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>Nama</Label>
                <Input
                  invalid={typeof errors.name?.message != "undefined"}
                  type="text"
                  innerRef={refName}
                  {...restName}
                />
                <FormFeedback>{errors.name?.message}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Alamat</Label>
                <Input
                  invalid={typeof errors.address?.message != "undefined"}
                  type="textarea"
                  innerRef={refAddress}
                  {...restAddress}
                />
                <FormFeedback>{errors.address?.message}</FormFeedback>
              </FormGroup>
              <FormGroup tag="fieldset">
                <Label>Jenis Kelamin</Label>
                <FormGroup check>
                  <Input
                    type="radio"
                    value="male"
                    invalid={typeof errors.gender?.message != "undefined"}
                    innerRef={refGender}
                    {...restGender}
                  />
                  <Label check>Male</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="radio"
                    value="female"
                    invalid={typeof errors.gender?.message != "undefined"}
                    innerRef={refGender}
                    {...restGender}
                  />
                  <Label check>Female</Label>
                  <FormFeedback>{errors.gender?.message}</FormFeedback>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label>Tanggal Lahir</Label>
                <Input
                  invalid={typeof errors.dob?.message != "undefined"}
                  type="date"
                  innerRef={refDob}
                  {...restDob}
                />
                <FormFeedback>{errors.dob?.message}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Photo</Label>
                <Input
                  invalid={typeof errors.photo?.message != "undefined"}
                  type="file"
                  accept="image/*"
                  innerRef={refPhoto}
                  {...restPhoto}
                />
                <FormText>
                  Please upload photo file, supported file: jpg, png
                </FormText>
                <FormFeedback>{errors.photo?.message}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>CV</Label>
                <Input
                  invalid={typeof errors.cv?.message != "undefined"}
                  type="file"
                  accept="image/*, application/pdf, application/msword"
                  innerRef={refCv}
                  {...restCv}
                />
                <FormText>
                  Please upload photo file, supported file: pdf, docx
                </FormText>
                <FormFeedback>{errors.cv?.message}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Certificate</Label>
                <Input
                  invalid={typeof errors.certificate?.message != "undefined"}
                  type="file"
                  accept="image/*, application/pdf, application/msword"
                  innerRef={refCertificate}
                  {...restCertificate}
                />
                <FormText>
                  Please upload photo file, supported file: png, jpg, jpeg, pdf,
                  docx
                </FormText>
                <FormFeedback>{errors.certificate?.message}</FormFeedback>
              </FormGroup>
              <Button type="submit">Submit</Button>{" "}
              <Button type="reset" color="danger">
                Reset
              </Button>
            </Form>
          </Col>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Lahir</th>
                  <th>Photo</th>
                  <th>CV</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswas.map(
                  (
                    { name, address, gender, dob, certificate, cv, photo },
                    key
                  ) => (
                    <tr key={key}>
                      <td>{name}</td>
                      <td>{address}</td>
                      <td>{gender}</td>
                      <td>{dob}</td>
                      <td>
                        <img
                          src={URL.createObjectURL(photo)}
                          width="100"
                          height="100"
                        />
                      </td>
                      <td>
                        <a href={URL.createObjectURL(cv)}>Download CV</a>
                      </td>
                      <td>
                        <a href={URL.createObjectURL(certificate)}>
                          Download Certificate
                        </a>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
