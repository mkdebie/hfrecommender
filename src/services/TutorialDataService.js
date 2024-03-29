import http from "../http-common";

class TutorialDataService {
  getAll(params) {
    return http.get("/tutorials", { params });
  }

  get(id) {
    return http.get(`/tutorials/single/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }

  getUnpublished(params) {
    return http.get(`/tutorials/unpublished`, { params})
  }

  getGuidelines() {
    return http.get("/tutorials/guidelines")
  }

  getGuideline(id) {
    console.log(id)
    return http.get(`/tutorials/guideline?guideline=${id}`)
  }

  getPrereqAssociated (id) {
    console.log (id)
    return http.get(`/tutorials/prereqs/${id}`)
  }

  getPrereqMinKey () {
    return http.get(`/tutorials/allPrereqMin`)
  }

  getSupports() {
    return http.get(`/tutorials/supportOf`)
  }

  getSupportsMin() {
    return http.get(`/tutorials/supportOfMin`)
  }

  getSupportsMinType () {
    return http.get (`/tutorials/supportOfMinType`)
  }
}

export default new TutorialDataService();