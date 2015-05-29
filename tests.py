import os
import nextgenweb
import unittest
import tempfile

class FlaskrTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, nextgenweb.app.config['DATABASE'] = tempfile.mkstemp()
        nextgenweb.app.config['TESTING'] = True
        self.app = nextgenweb.app.test_client()
        nextgenweb.init_db()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(nextgenweb.app.config['DATABASE'])

    def test_empty_db(self):
        rv = self.app.get('/')
        assert 'No entries here so far' in rv.data

if __name__ == '__main__':
    unittest.main()


